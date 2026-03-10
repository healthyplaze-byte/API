
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = "thegeorgedigitals@gmail.com";
  
  // 1. Find the User ID (via GuestProfile if they registered)
  const guest = await prisma.guestProfile.findFirst({
    where: { email }
  });

  if (!guest || !guest.userId) {
    console.log(`User ${email} not found in GuestProfile. Please sign up first.`);
    return;
  }

  console.log(`Found User ID: ${guest.userId}`);

  // 2. Get the Hotel and Role
  const hotel = await prisma.hotel.findFirst();
  const role = await prisma.role.findUnique({ where: { key: "SUPER_ADMIN" } });

  if (!hotel || !role) {
    console.log("Hotel or Role not found. Run seed-roles.ts and seed-rooms.ts first.");
    return;
  }

  // 3. Create/Update HotelUser
  const hotelUser = await prisma.hotelUser.upsert({
    where: {
      userId_hotelId_roleId: {
        userId: guest.userId,
        hotelId: hotel.id,
        roleId: role.id
      }
    },
    update: { isActive: true },
    create: {
      userId: guest.userId,
      hotelId: hotel.id,
      roleId: role.id,
      isActive: true
    }
  });

  console.log(`Successfully promoted ${email} to SUPER_ADMIN for ${hotel.name}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
