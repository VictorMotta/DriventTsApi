import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getUserBooking, postANewBooking } from '@/controllers';
import { bodyANewBookingSchema } from '@/schemas/bookings-schemas';

const bookingRouter = Router();

bookingRouter
  .use('/*', authenticateToken)
  .get('/', getUserBooking)
  .post('/', validateBody(bodyANewBookingSchema), postANewBooking);

export { bookingRouter };
