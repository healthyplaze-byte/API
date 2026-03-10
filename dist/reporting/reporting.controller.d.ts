import { ReportingService } from "./reporting.service";
export declare class ReportingController {
    private readonly reportingService;
    constructor(reportingService: ReportingService);
    getOccupancyReport(req: any): Promise<{
        totalRooms: number;
        occupiedRooms: number;
        occupancyPercentage: number;
    }>;
    getRevenueReport(req: any, startDate?: string, endDate?: string): Promise<{
        totalRevenue: number;
        transactionCount: number;
    }>;
    getMaintenanceSummary(req: any): Promise<{
        openRequests: number;
        inProgressRequests: number;
    }>;
}
