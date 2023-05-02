import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsServices from '@/services/bookings-service';
import { infoBooking } from '@/protocols';

export async function getUserBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  try {
    const booking: infoBooking = await bookingsServices.getUserBooking(userId);
    res.send(booking);
  } catch (err) {
    next(err);
  }
}

export async function postANewBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const roomId = req.body.roomId as number;
  try {
    const bookingId = await bookingsServices.postANewBooking(userId, roomId);
    res.send({ bookingId });
  } catch (err) {
    next(err);
  }
}

export async function updateRoomOfBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const roomId = req.body.roomId as number;
  const { bookingId } = req.params;
  try {
    const incomingBookingId = await bookingsServices.updateRoomOfBooking({ userId, roomId, bookingId: +bookingId });
    return res.send({ bookingId: incomingBookingId });
  } catch (err) {
    next(err);
  }
}
