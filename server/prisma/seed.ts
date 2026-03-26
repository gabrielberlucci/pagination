import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { LogLevel, PrismaClient } from '../generated/prisma/client';
import { faker } from '@faker-js/faker';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

const levels: LogLevel[] = ['INFO', 'ERROR', 'WARN'];
const endpoints = ['GET', 'POST', 'PUT', 'DELETE'];
const message = [
  'GET /api/users - 200 OK',
  'GET /api/users - 500 ERROR',
  'DELETE /api/posts - 500 ERROR',
  'POST /api/login - 403 UNAUTHORIZED',
  'GET /api/user - 404 NOT FOUND',
];

function createRandomLogs() {
  return {
    timestamp: faker.date.anytime(),
    level: faker.helpers.arrayElement(levels),
    userID: faker.number.int({ max: 2147483647 }),
    ipAddress: faker.internet.ipv4(),
    method: faker.internet.httpMethod(),
    endpoint: faker.helpers.arrayElement(endpoints),
    message: faker.helpers.arrayElement(message),
  };
}

const data = faker.helpers.multiple(createRandomLogs, {
  count: 50000,
});

async function main() {
  await prisma.logs.createMany({
    data,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
