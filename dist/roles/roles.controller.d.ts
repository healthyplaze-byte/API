import { RolesService } from "./roles.service";
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
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
