import { User } from '@prisma/client';
import { createHotel, createRoomWithHotelId } from './hotels-factory';
import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function createABookingValid(user?: User) {
  const incomingUser = user || (await createUser());
  const hotel = await createHotel();
  const room = await createRoomWithHotelId(hotel.id);

  return await prisma.booking.create({
    data: {
      userId: incomingUser.id,
      roomId: room.id,
    },
  });
}
