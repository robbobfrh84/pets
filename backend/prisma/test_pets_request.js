const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function checkPetsWithToys() {
  const petsWithToys = await prisma.pet.findMany({
    include: {
      toys: true
    }
  });

  console.dir(petsWithToys, { depth: null });

  await prisma.$disconnect();
}

checkPetsWithToys();