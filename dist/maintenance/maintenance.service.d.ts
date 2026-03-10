import { PrismaService } from "../prisma/prisma.service";
import { MaintenanceStatus, TaskPriority } from "@prisma/client";
export declare class MaintenanceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(hotelId: string): Promise<({
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
    create(hotelId: string, data: {
        roomId?: string;
        reportedBy?: string;
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
        startedAt?: Date;
        completedAt?: Date;
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
