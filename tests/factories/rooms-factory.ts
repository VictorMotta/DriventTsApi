import { createHotel, createRoomWithHotelId } from './hotels-factory';
import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function createARoomValid() {
  const hotel = await createHotel();
  const room = await createRoomWithHotelId(hotel.id);

  return room.id;
}

export async function createARoomWithoutVacancies() {
  const user = await createUser();
  const hotel = await createHotel();
  const room = await createRoomWithHotelId(hotel.id);

  return await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: room.id,
    },
  });
}
