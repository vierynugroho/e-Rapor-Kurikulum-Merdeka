import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;

async function setTimezone() {
    try {
        await prisma.$queryRawUnsafe(`SET TIME ZONE 'Asia/Jakarta'`);
        console.log('Timezone set to Asia/Jakarta');
    } catch (error) {
        console.error('Error setting timezone:', error);
    }
}

setTimezone();
