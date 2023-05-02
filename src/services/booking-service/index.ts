import { notFoundError } from '@/errors';
import { forbidden } from '@/errors/forbidden-error';
import { ParamsBookings, infoBooking } from '@/protocols';
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
  if (!ticket || ticket.TicketType.isRemote || ticket.status === 'RESERVED' || !ticket.TicketType.includesHotel)
    throw forbidden();

  const roomExist = await roomRepository.getRoomById(roomId);
  if (!roomExist) throw notFoundError();

  const freeRoom = await bookingRepository.getBookingByRoomId(roomId);
  if (freeRoom) throw forbidden();

  const booking = await bookingRepository.postANewBooking({ userId, roomId });

  return booking.id;
}

async function updateRoomOfBooking({ userId, roomId, bookingId }: ParamsBookings) {
  const bookingExist = await bookingRepository.getBookingByIdAndVerifyIfUserId({ userId, bookingId });
  if (!bookingExist) throw forbidden();

  const roomExist = await roomRepository.getRoomById(roomId);
  if (!roomExist) throw notFoundError();

  const freeRoom = await bookingRepository.getBookingByRoomId(roomId);
  if (freeRoom) throw forbidden();

  const { id: incomingBookingId } = await bookingRepository.updateRoomOfBooking({ bookingId, roomId });

  return incomingBookingId;
}

const bookingsServices = { getUserBooking, postANewBooking, updateRoomOfBooking };

export default bookingsServices;
