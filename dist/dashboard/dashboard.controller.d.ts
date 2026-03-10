import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(req: any): Promise<{
        occupancy: number;
        activeReservations: number;
        pendingReservations: number;
        revenue: number;
        maintenanceIssues: number;
        dirtyRooms: number;
    }>;
}
