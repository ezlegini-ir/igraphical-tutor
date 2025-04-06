import { auth } from "@/auth";
import { prisma } from "@igraphical/core";

export const getAdmins = async () => {
  return await prisma.admin.findMany();
};

export const getTutorByIdentifier = async (identifier: string) => {
  return await prisma.tutor.findFirst({
    where: {
      OR: [{ phone: identifier }, { email: identifier }],
    },
  });
};

export const getTutorById = async (id: string | number) => {
  return await prisma.tutor.findUnique({
    where: {
      id: +id,
    },
    include: { image: true },
  });
};

export const getSessionTutor = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return userId ? await getTutorById(userId) : null;
};
