import { PrismaService } from "../prisma/prisma.service";
export declare class RolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listRoles(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        key: string;
        description: string | null;
        priority: number;
        isAssignableToStaff: boolean;
        isAssignableToGuests: boolean;
    }[]>;
    listPermissions(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        key: string;
        description: string | null;
    }[]>;
}
