
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ROLES = [
  {
    key: 'SUPER_ADMIN',
    name: 'Super Admin',
    description: 'Full access to all system features',
    priority: 100,
    isAssignableToStaff: true,
    isAssignableToGuests: false,
  },
  {
    key: 'HOTEL_MANAGER',
    name: 'Hotel Manager',
    description: 'Manage hotel operations, staff, and reports',
    priority: 90,
    isAssignableToStaff: true,
    isAssignableToGuests: false,
  },
  {
    key: 'FRONT_DESK',
    name: 'Front Desk Agent',
    description: 'Manage reservations, check-ins, and guest requests',
    priority: 50,
    isAssignableToStaff: true,
    isAssignableToGuests: false,
  },
  {
    key: 'HOUSEKEEPING',
    name: 'Housekeeping Staff',
    description: 'View and update room cleaning status',
    priority: 30,
    isAssignableToStaff: true,
    isAssignableToGuests: false,
  },
  {
    key: 'MAINTENANCE',
    name: 'Maintenance Staff',
    description: 'View and resolve maintenance requests',
    priority: 30,
    isAssignableToStaff: true,
    isAssignableToGuests: false,
  },
  {
    key: 'GUEST',
    name: 'Guest',
    description: 'Hotel guest access',
    priority: 10,
    isAssignableToStaff: false,
    isAssignableToGuests: true,
  }
];

const PERMISSIONS = [
  // Reservations
  { key: 'reservations.read', name: 'View Reservations' },
  { key: 'reservations.create', name: 'Create Reservations' },
  { key: 'reservations.update', name: 'Update Reservations' },
  { key: 'reservations.delete', name: 'Delete Reservations' },
  
  // Rooms
  { key: 'rooms.read', name: 'View Rooms' },
  { key: 'rooms.manage', name: 'Manage Rooms' },
  
  // Users
  { key: 'users.read', name: 'View Staff' },
  { key: 'users.manage', name: 'Manage Staff' },
  
  // Reports
  { key: 'reports.read', name: 'View Reports' },
  
  // Settings
  { key: 'settings.manage', name: 'Manage Settings' },
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: ['*'], // Special case handling in code usually, or assign all
  HOTEL_MANAGER: ['reservations.*', 'rooms.*', 'users.*', 'reports.*', 'settings.*'],
  FRONT_DESK: ['reservations.*', 'rooms.read', 'users.read'],
  HOUSEKEEPING: ['rooms.read'], // Needs specific task permissions later
  MAINTENANCE: ['rooms.read'],
  GUEST: []
};

async function main() {
  console.log('Seeding Roles and Permissions...');

  // 1. Create Permissions
  const permissionMap = new Map();
  for (const p of PERMISSIONS) {
    const permission = await prisma.permission.upsert({
      where: { key: p.key },
      update: {},
      create: p,
    });
    permissionMap.set(p.key, permission.id);
  }
  console.log(`Created ${permissionMap.size} permissions.`);

  // 2. Create Roles
  for (const r of ROLES) {
    const role = await prisma.role.upsert({
      where: { key: r.key },
      update: {},
      create: r,
    });
    console.log(`Role ${r.name} ready.`);

    // 3. Assign Permissions to Roles
    // Logic to expand wildcards like 'reservations.*'
    let rolePerms: string[] = [];
    const config = ROLE_PERMISSIONS[r.key as keyof typeof ROLE_PERMISSIONS];
    
    if (config.includes('*')) {
      rolePerms = Array.from(permissionMap.keys());
    } else {
      for (const pattern of config) {
        if (pattern.endsWith('.*')) {
          const prefix = pattern.replace('.*', '');
          for (const key of permissionMap.keys()) {
            if (key.startsWith(prefix)) rolePerms.push(key);
          }
        } else {
          if (permissionMap.has(pattern)) rolePerms.push(pattern);
        }
      }
    }

    // Assign
    for (const permKey of rolePerms) {
      const permId = permissionMap.get(permKey);
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permId
          }
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permId
        }
      });
    }
  }

  console.log('Roles and Permissions seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
