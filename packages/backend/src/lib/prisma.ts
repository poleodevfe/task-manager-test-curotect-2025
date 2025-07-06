import { PrismaClient } from '@prisma/client';

// Se crea una instancia única del cliente de Prisma
const prisma = new PrismaClient();

export default prisma;
