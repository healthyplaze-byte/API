import { MaintenanceService } from "./maintenance.service";
import { MaintenanceStatus, TaskPriority } from "@prisma/client";
export declare class MaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    findAll(req: any): Promise<({
        room: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            hotelId: string;
            roomTypeId: string;
            roomNumber: string;
            floor: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        description: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.MaintenanceStatus;
        roomId: string | null;
        assignedStaffId: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        reportedBy: string | null;
        category: string;
        cost: import("@prisma/client/runtime/library").Decimal | null;
    })[]>;
    findOne(id: string): Promise<({
        room: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            hotelId: string;
            roomTypeId: string;
            roomNumber: string;
            floor: string | null;
            status: import(".prisma/client").$Enums.RoomStatus;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        description: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.MaintenanceStatus;
        roomId: string | null;
        assignedStaffId: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        reportedBy: string | null;
        category: string;
        cost: import("@prisma/client/runtime/library").Decimal | null;
    }) | null>;
    create(req: any, data: {
        roomId?: string;
        category: string;
        description: string;
        priority?: TaskPriority;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        description: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.MaintenanceStatus;
        roomId: string | null;
        assignedStaffId: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        reportedBy: string | null;
        category: string;
        cost: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    update(id: string, data: {
        assignedStaffId?: string;
        status?: MaintenanceStatus;
        priority?: TaskPriority;
        cost?: number;
        startedAt?: string;
        completedAt?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        description: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.MaintenanceStatus;
        roomId: string | null;
        assignedStaffId: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        reportedBy: string | null;
        category: string;
        cost: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        description: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.MaintenanceStatus;
        roomId: string | null;
        assignedStaffId: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        reportedBy: string | null;
        category: string;
        cost: import("@prisma/client/runtime/library").Decimal | null;
    }>;
}
