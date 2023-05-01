import { prisma } from '@/config';
import { BookingWithRoom, infoBooking } from '@/protocols';
import { Booking, Room } from '@prisma/client';

async function getUserBooking(userId: number): Promise<infoBooking> {
  return await prisma.booking.findFirst({
    select: {
      id: true,
      Room: true,
    },
    where: {
      userId,
    },
  });
}

async function getBookingByRoomId(roomId: number): Promise<BookingWithRoom> {
  return await prisma.booking.findFirst({
    select: {
      id: true,
      userId: true,
      roomId: true,
      createdAt: true,
      updatedAt: true,
      Room: true,
    },
    where: {
      roomId,
    },
  });
}

async function postANewBooking({ userId, roomId }: paramsNewBooking): Promise<Booking> {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

const bookingRepository = { getUserBooking, getBookingByRoomId, postANewBooking };

export default bookingRepository;

type paramsNewBooking = { userId: number; roomId: number };
