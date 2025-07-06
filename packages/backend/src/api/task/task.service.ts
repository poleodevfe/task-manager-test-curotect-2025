import prisma from '../../lib/prisma';

// get all tasks
export const getAllTasks = async () => {
  return await prisma.task.findMany();
};

export const createTask = async (title: string, description?: string) => {
  return await prisma.task.create({
    data: {
      title,
      description,
    },
  });
};
