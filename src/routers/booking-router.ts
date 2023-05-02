import { Router } from 'express';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { getUserBooking, postANewBooking, updateRoomOfBooking } from '@/controllers';
import { bodyANewBookingSchema, paramAUpdateBookingSchema } from '@/schemas/bookings-schemas';

const bookingRouter = Router();

bookingRouter
  .use('/*', authenticateToken)
  .get('/', getUserBooking)
  .post('/', validateBody(bodyANewBookingSchema), postANewBooking)
  .put(
    '/:bookingId',
    validateBody(bodyANewBookingSchema),
    validateParams(paramAUpdateBookingSchema),
    updateRoomOfBooking,
  );

export { bookingRouter };
