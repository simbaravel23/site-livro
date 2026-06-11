require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

(async () => {
  const p = new PrismaClient();
  try {
    await p.$connect();
    console.log('Prisma connected OK');
  } catch (e) {
    console.error('Prisma connect error:', e);
    process.exit(1);
  } finally {
    await p.$disconnect();
  }
})();
