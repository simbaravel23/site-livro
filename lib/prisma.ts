import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });

const client = global.prisma || new PrismaClient({ adapter } as any);

if (process.env.NODE_ENV !== 'production') global.prisma = client;

export default client;
