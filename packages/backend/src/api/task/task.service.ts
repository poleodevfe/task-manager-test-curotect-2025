import prisma from '../../lib/prisma';

export const getAllTasks = async () => {
  return prisma.task.findMany();
};

export const getTaskById = async (id: number) => {
  return prisma.task.findUnique({ where: { id } });
};

export const createTask = async (title: string, description?: string) => {
  return prisma.task.create({
    data: { title, description },
  });
};

interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const updateTask = async (id: number, data: UpdateTaskInput) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTask = async (id: number) => {
  return prisma.task.delete({ where: { id } });
};
