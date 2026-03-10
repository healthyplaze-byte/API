
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Get the Hotel (create one if missing)
  let hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    console.log("Creating default hotel...");
    hotel = await prisma.hotel.create({
      data: {
        name: "The Utnei Palace",
        address: "123 Luxury Lane",
        phone: "+1234567890",
        email: "info@utnei.com"
      }
    });
  }
  console.log("Using Hotel:", hotel.name);

  // 2. Get Room Types (create defaults if missing)
  let types = await prisma.roomType.findMany();
  if (types.length === 0) {
    console.log("Creating default room types...");
    await prisma.roomType.createMany({
      data: [
        {
          hotelId: hotel.id,
          name: "Deluxe Suite",
          description: "Spacious suite with ocean view",
          basePrice: 250,
          capacity: 2
        },
        {
          hotelId: hotel.id,
          name: "Standard Room",
          description: "Cozy room with city view",
          basePrice: 150,
          capacity: 2
        }
      ]
    });
    types = await prisma.roomType.findMany();
  }
  console.log("Found Room Types:", types.map(t => t.name).join(", "));

  // 3. Create Rooms for each Type
  for (const type of types) {
    const existingRooms = await prisma.room.count({ where: { roomTypeId: type.id } });
    if (existingRooms === 0) {
      console.log(`Creating 5 rooms for ${type.name}...`);
      const roomsData = Array.from({ length: 5 }).map((_, i) => ({
        hotelId: hotel!.id,
        roomTypeId: type.id,
        roomNumber: `${type.name.substring(0, 1)}${100 + i}`, // e.g., D100, D101
        floor: 1,
        status: "AVAILABLE"
      }));
      
      // @ts-ignore
      await prisma.room.createMany({ data: roomsData });
    } else {
      console.log(`${type.name} already has ${existingRooms} rooms.`);
    }
  }
  
  console.log("Done! Rooms are ready.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
