import { Booking, Payment, Room, Ticket } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

export type InputTicketBody = {
  ticketTypeId: number;
};

export type infoBooking = {
  id: number;
  Room: Room;
};

export type bodyANewBooking = {
  roomId: number;
};

export type BookingWithRoom = Booking & { Room: Room };
