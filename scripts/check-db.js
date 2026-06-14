#!/usr/bin/env node
require('dotenv').config();
let PrismaClient;
async function loadPrisma() {
  // Prefer dynamic import to be robust across CJS/ESM builds
  const mod = await import('@prisma/client').catch((e) => {
    console.error('import(@prisma/client) failed:', e?.message || e);
    return null;
  });
  if (!mod) return null;

  const pkg = mod;
  console.log('Prisma package shape (dynamic import):', {
    hasNamed: !!pkg.PrismaClient,
    hasDefault: !!pkg.default,
    exportKeys: Object.keys(pkg).slice(0,20),
    defaultType: typeof pkg.default,
  });

  const PrismaClientExport = pkg.PrismaClient || pkg.default?.PrismaClient || pkg.default || pkg;
  console.log('PrismaClientExport type:', typeof PrismaClientExport, Object.keys(PrismaClientExport || {}).slice(0,20));
  PrismaClient = PrismaClientExport.PrismaClient || PrismaClientExport;
  console.log('Resolved PrismaClient type:', typeof PrismaClient, PrismaClient?.name || null);
  return PrismaClient;
}

function maskUrl(u) {
  if (!u) return '<not set>';
  return u.replace(/\/\/(.*?)@/, '//****@');
}

async function main() {
  const url = process.env.DATABASE_URL;
  console.log('DATABASE_URL:', maskUrl(url));

  const Loaded = await loadPrisma();
  if (!Loaded) {
    console.error('Could not load Prisma client module');
    process.exitCode = 3;
    return;
  }
  // Create a Postgres driver adapter from @prisma/adapter-pg so PrismaClient can initialize
  const AdapterPkg = await import('@prisma/adapter-pg').catch(() => null);
  const PrismaPg = AdapterPkg?.PrismaPg || AdapterPkg?.default?.PrismaPg || AdapterPkg?.default;
  const adapter = PrismaPg ? new PrismaPg({ connectionString: url }) : undefined;
  const prisma = adapter ? new Loaded({ adapter }) : new Loaded({});
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connected to database. Running simple query...');
    const now = await prisma.$queryRawUnsafe('SELECT NOW() as now');
    console.log('DB time:', now);
    console.log('✅ Database check passed.');
    process.exitCode = 0;
  } catch (err) {
    console.error('❌ Database check failed:', err?.message || err);
    if (process.env.NODE_ENV !== 'production') console.error(err?.stack || err);
    process.exitCode = 2;
  } finally {
    try { await prisma.$disconnect(); } catch (e) { }
  }
}

main();
