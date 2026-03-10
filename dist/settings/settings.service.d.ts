import { PrismaService } from "../prisma/prisma.service";
export declare class SettingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSettings(hotelId: string): import(".prisma/client").Prisma.Prisma__HotelSettingsClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        brandingLogoUrl: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        contactEmail: string | null;
        contactPhone: string | null;
        websiteUrl: string | null;
        checkinTime: string;
        checkoutTime: string;
        cancellationPolicy: string | null;
        noShowPolicy: string | null;
        taxPercentage: import("@prisma/client/runtime/library").Decimal;
        serviceChargePercentage: import("@prisma/client/runtime/library").Decimal;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateSettings(hotelId: string, data: any): import(".prisma/client").Prisma.Prisma__HotelSettingsClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        brandingLogoUrl: string | null;
        primaryColor: string | null;
        secondaryColor: string | null;
        contactEmail: string | null;
        contactPhone: string | null;
        websiteUrl: string | null;
        checkinTime: string;
        checkoutTime: string;
        cancellationPolicy: string | null;
        noShowPolicy: string | null;
        taxPercentage: import("@prisma/client/runtime/library").Decimal;
        serviceChargePercentage: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
