const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function checkToys() {
  const allToys = await prisma.toy.findMany();
  console.dir(allToys, { depth: null });

  await prisma.$disconnect();
}

checkToys();