import { AuditService } from "./audit.service";
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    list(hotelId: string): import(".prisma/client").Prisma.PrismaPromise<{
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
