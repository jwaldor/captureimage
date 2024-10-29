import { PrismaClient } from "@prisma/client";

export const DBFileService = () => {
  const prisma = new PrismaClient();
  return {
    getFile: async (id: string) => {
      console.error("no code to get file");
    },
    saveFile: async (id: string, userId: string) => {
      const user = await prisma.image.create({ data: { id, userId } });
      return user;
    },
  };
};
