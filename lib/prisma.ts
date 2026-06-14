import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const maskUrl = (u?: string) => {
  if (!u) return '<not set>';
  return u.replace(/\/\/(.*?)@/, '//****@');
};

let client: PrismaClient;
try {
  const connectionString = process.env.DATABASE_URL || '';
  const adapter = new PrismaPg({ connectionString });
  client = global.prisma || new PrismaClient({ adapter } as any);

  if (process.env.NODE_ENV !== 'production') global.prisma = client;
} catch (err) {
  console.error('Prisma initialization failed. DATABASE_URL:', maskUrl(process.env.DATABASE_URL));
  console.error(err?.message || err);
  // Re-throw so the application fails early and logs show the root cause
  throw err;
}

export default client;
