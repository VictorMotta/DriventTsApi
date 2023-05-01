import { notFoundError } from '@/errors';
import { infoBooking } from '@/protocols';
import bookingRepository from '@/repositories/booking-repository';

async function getUserBooking(userId: number): Promise<infoBooking> {
  const booking = await bookingRepository.getUserBooking(userId);

  if (!booking) throw notFoundError();

  return booking;
}

const bookingsServices = { getUserBooking };

export default bookingsServices;
