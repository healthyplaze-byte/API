import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { PrismaService } from "../prisma/prisma.service";

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private readonly prisma: PrismaService) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error(
        "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured"
      );
    }

    this.supabase = createClient(url, key);
  }

  async login(payload: LoginPayload) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    });

    if (error || !data.session || !data.user) {
      throw error ?? new Error("Invalid credentials");
    }

    const userId = data.user.id;

    const profile = await this.prisma.profile.findUnique({
      where: { id: userId }
    });

    const guestProfile = await this.prisma.guestProfile.findFirst({
      where: { userId }
    });

    const memberships = await this.prisma.hotelUser.findMany({
      where: { userId, isActive: true },
      include: { hotel: true, role: { include: { rolePermissions: true } } }
    });

    return {
      session: data.session,
      user: {
        id: userId,
        email: data.user.email,
        profile,
        guestProfile
      },
      memberships
    };
  }

  async registerGuest(payload: LoginPayload & { fullName: string }) {
    console.log("Registering guest:", payload.email);
    const { data, error } = await this.supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        emailRedirectTo: "http://localhost:3002/login",
        data: {
          full_name: payload.fullName
        }
      }
    });

    if (error) {
      console.error("Supabase signUp error:", error);
      throw error;
    }
    
    if (!data.user) {
      console.error("Supabase signUp returned no user");
      throw new Error("Signup failed - no user returned");
    }

    const userId = data.user.id;
    console.log("Supabase user created:", userId);

    try {
      // Create a GuestProfile linked to this Supabase user
      const guestProfile = await this.prisma.guestProfile.create({
        data: {
          userId,
          fullName: payload.fullName,
          email: payload.email,
          loyaltyPoints: 0,
          loyaltyTier: "BRONZE"
        }
      });
      console.log("GuestProfile created:", guestProfile.id);

      return {
        user: {
          id: userId,
          email: data.user.email,
          guestProfile
        }
      };
    } catch (dbError: any) {
      console.error("Database error creating GuestProfile:", dbError);
      // Optional: Delete Supabase user to rollback? Or just fail.
      // For now, let's fail but log it clearly.
      throw new Error(`Registration failed during profile creation: ${dbError.message}`);
    }
  }

  async updatePassword(userId: string, password: string) {
    const { data, error } = await this.supabase.auth.admin.updateUserById(userId, {
      password: password
    });

    if (error) {
      throw error;
    }

    return { message: "Password updated successfully" };
  }
}

