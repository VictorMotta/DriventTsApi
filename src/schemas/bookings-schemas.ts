import joi from 'joi';
import { bodyANewBooking } from '@/protocols';

export const bodyANewBookingSchema = joi.object<bodyANewBooking>({
  roomId: joi.number().required(),
});
