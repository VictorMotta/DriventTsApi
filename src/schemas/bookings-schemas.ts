import joi from 'joi';
import { bodyANewBooking, paramAUpdateBooking } from '@/protocols';

export const bodyANewBookingSchema = joi.object<bodyANewBooking>({
  roomId: joi.number().required(),
});

export const paramAUpdateBookingSchema = joi.object<paramAUpdateBooking>({
  bookingId: joi.number().required(),
});
