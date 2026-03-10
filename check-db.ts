import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const hotels = await prisma.hotel.findMany();
  console.log('--- HOTELS ---');
  console.log(hotels.map(h => ({ id: h.id, name: h.name, code: h.code, isActive: h.isActive })));

  const roomTypes = await prisma.roomType.findMany();
  console.log('\n--- ROOM TYPES ---');
  console.log(roomTypes.map(rt => ({ id: rt.id, name: rt.name, hotelId: rt.hotelId })));

  const rooms = await prisma.room.findMany();
  console.log('\n--- ROOMS ---');
  console.log(rooms.map(r => ({ id: r.id, number: r.roomNumber, status: r.status, hotelId: r.hotelId })));

  const reservations = await prisma.reservation.findMany();
  console.log('\n--- RESERVATIONS ---');
  console.log(reservations.map(res => ({ id: res.id, roomId: res.roomId, from: res.checkInDate, to: res.checkOutDate })));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
