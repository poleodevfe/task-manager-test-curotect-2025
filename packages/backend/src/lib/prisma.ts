import { PrismaClient } from '../../generated/prisma';

// Se crea una instancia única del cliente de Prisma
const prisma = new PrismaClient();

export default prisma;
