import { PrismaClient, RoomStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING DATABASE ---');

  // 1. Create a default hotel
  const hotel = await prisma.hotel.upsert({
    where: { code: 'SMART-OS' },
    update: {},
    create: {
      name: 'Smart Hotel OS Headquarters',
      code: 'SMART-OS',
      timezone: 'UTC',
      currency: 'USD',
      isActive: true,
    }
  });
  console.log(`Hotel created: ${hotel.name}`);

  // 2. Create room types
  const deluxeType = await prisma.roomType.create({
    data: {
      hotelId: hotel.id,
      name: 'Deluxe Ocean Suite',
      description: 'A luxurious suite with panoramic ocean views and premium amenities.',
      basePrice: 250.00,
      capacity: 2,
    }
  });

  const familyType = await prisma.roomType.create({
    data: {
      hotelId: hotel.id,
      name: 'Family Executive Wing',
      description: 'Spacious interconnecting rooms perfect for families or groups.',
      basePrice: 450.00,
      capacity: 4,
    }
  });
  console.log('Room types created.');

  // 3. Create rooms
  const rooms = [
    { roomNumber: '101', floor: '1', roomTypeId: deluxeType.id },
    { roomNumber: '102', floor: '1', roomTypeId: deluxeType.id },
    { roomNumber: '201', floor: '2', roomTypeId: familyType.id },
    { roomNumber: '202', floor: '2', roomTypeId: familyType.id },
  ];

  for (const r of rooms) {
    await prisma.room.create({
      data: {
        ...r,
        hotelId: hotel.id,
        status: RoomStatus.AVAILABLE,
      }
    });
  }
  console.log(`${rooms.length} rooms created.`);

  // 4. Create a guest profile for testing (optional but helpful)
  await prisma.guestProfile.create({
    data: {
      fullName: 'John Guest',
      email: 'guest@example.com',
      loyaltyTier: 'GOLD',
      loyaltyPoints: 500,
    }
  });
  console.log('Sample guest profile created.');

  console.log('--- SEEDING COMPLETE ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
