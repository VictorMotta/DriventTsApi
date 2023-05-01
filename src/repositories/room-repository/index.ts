import { prisma } from '@/config';

async function getRoomById(id: number) {
  return await prisma.room.findFirst({
    where: {
      id,
    },
  });
}

const roomRepository = {
  getRoomById,
};

export default roomRepository;
