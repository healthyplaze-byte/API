import { PrismaService } from "../prisma/prisma.service";
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listLogs(hotelId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        hotelId: string | null;
        action: string;
        actorUserId: string | null;
        entityType: string;
        entityId: string;
        meta: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
}
