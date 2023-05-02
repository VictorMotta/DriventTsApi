import { Booking } from '@prisma/client';
import { prisma } from '@/config';
import { BookingWithRoom, PartialBookingsParam, infoBooking } from '@/protocols';

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

async function getBookingByIdAndVerifyIfUserId({ userId, bookingId }: PartialBookingsParam): Promise<Booking> {
  return await prisma.booking.findFirst({
    where: {
      AND: [
        {
          id: bookingId,
        },
        { userId },
      ],
    },
  });
}

async function updateRoomOfBooking({ bookingId, roomId }: PartialBookingsParam): Promise<Booking> {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

const bookingRepository = {
  getUserBooking,
  getBookingByRoomId,
  postANewBooking,
  getBookingByIdAndVerifyIfUserId,
  updateRoomOfBooking,
};

export default bookingRepository;

type paramsNewBooking = { userId: number; roomId: number };
