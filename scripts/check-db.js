#!/usr/bin/env node
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

function maskUrl(u) {
  if (!u) return '<not set>';
  return u.replace(/\/\/(.*?)@/, '//****@');
}

async function main() {
  const url = process.env.DATABASE_URL;
  console.log('DATABASE_URL:', maskUrl(url));

  const prisma = new PrismaClient();
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
