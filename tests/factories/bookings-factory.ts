import { User } from '@prisma/client';
import { createHotel, createRoomWithHotelId } from './hotels-factory';
import { prisma } from '@/config';

export async function createABookingValid(user: User) {
  const hotel = await createHotel();
  const room = await createRoomWithHotelId(hotel.id);

  return await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: room.id,
    },
  });
}
