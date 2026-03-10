import { PrismaService } from "../prisma/prisma.service";
import { HousekeepingStatus, TaskPriority } from "@prisma/client";
export declare class HousekeepingService {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.HousekeepingStatus;
        roomId: string;
        assignedStaffId: string | null;
        notes: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.HousekeepingStatus;
        roomId: string;
        assignedStaffId: string | null;
        notes: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
    }) | null>;
    create(hotelId: string, data: {
        roomId: string;
        assignedStaffId?: string;
        priority?: TaskPriority;
        notes?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.HousekeepingStatus;
        roomId: string;
        assignedStaffId: string | null;
        notes: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
    }>;
    update(id: string, data: {
        assignedStaffId?: string;
        status?: HousekeepingStatus;
        priority?: TaskPriority;
        notes?: string;
        startedAt?: Date;
        completedAt?: Date;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.HousekeepingStatus;
        roomId: string;
        assignedStaffId: string | null;
        notes: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hotelId: string;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.HousekeepingStatus;
        roomId: string;
        assignedStaffId: string | null;
        notes: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
    }>;
}
