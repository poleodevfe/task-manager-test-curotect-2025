import prisma from '../../lib/prisma';

// get all tasks
export const getAllTasks = async () => {
  return await prisma.task.findMany();
};
