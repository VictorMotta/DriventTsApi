import { notFoundError } from '@/errors';
import { forbidden } from '@/errors/forbidden-error';
import { infoBooking } from '@/protocols';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getUserBooking(userId: number): Promise<infoBooking> {
  const booking = await bookingRepository.getUserBooking(userId);

  if (!booking) throw notFoundError();

  return booking;
}

async function postANewBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.TicketType.isRemote || ticket.status === 'PAID' || !ticket.TicketType.includesHotel)
    throw forbidden();

  const freeRoom = bookingRepository.getBookingByRoomId(roomId);
  if (freeRoom) throw forbidden();

  const roomExist = roomRepository.getRoomById(roomId);
  if (!roomExist) throw notFoundError();

  const booking = await bookingRepository.postANewBooking({ userId, roomId });

  return booking.id;
}

const bookingsServices = { getUserBooking, postANewBooking };

export default bookingsServices;
