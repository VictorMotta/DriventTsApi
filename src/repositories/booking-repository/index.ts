import { prisma } from '@/config';
import { infoBooking } from '@/protocols';

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

const bookingRepository = { getUserBooking };

export default bookingRepository;
