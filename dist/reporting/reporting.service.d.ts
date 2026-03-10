import { PrismaService } from "../prisma/prisma.service";
export declare class ReportingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOccupancyReport(hotelId: string): Promise<{
        totalRooms: number;
        occupiedRooms: number;
        occupancyPercentage: number;
    }>;
    getRevenueReport(hotelId: string, startDate?: Date, endDate?: Date): Promise<{
        totalRevenue: number;
        transactionCount: number;
    }>;
    getMaintenanceSummary(hotelId: string): Promise<{
        openRequests: number;
        inProgressRequests: number;
    }>;
}
