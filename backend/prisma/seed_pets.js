const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient()


async function main() {
  await prisma.toy.deleteMany();
  await prisma.pet.deleteMany();

  await prisma.$executeRawUnsafe(`SELECT setval('toy_toy_id_seq', 1, false)`);
  await prisma.$executeRawUnsafe(`SELECT setval('pet_pet_id_seq', 1, false)`);

  await Promise.all(
    pets.map(({ name, type, age, toys }) =>
      prisma.pet.create({
        data: {
          name,
          type,
          age,
          toys: toys ? {
            create: toys
          } : undefined
        }
      })
    )
  );

  const allPets = await prisma.pet.findMany({
    include: { toys: true }
  });

  console.dir(allPets, { depth: null });

  console.log('Test data seeded 🌰 ✅');
}

main()
  .catch((e) => {
    console.error('🌰 ❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


const pets = [
  {
    name: "Summit",
    type: "dog",
    age: 3,
    toys: [
      { name: "Rubber Ducky", likes: false },
      { name: "Frisby", likes: true }
    ]
  },
  {
    name: "Whiskers",
    type: "cat",
    age: 2,
    description: "Very vocal and curious, loves sunbathing.",
    toys: [
      { name: "Feather Wand", likes: true },
      { name: "Laser Pointer", likes: true }
    ]
  },
  {
    name: "Coco",
    type: "bird",
    age: 3,
    description: "Enjoys whistling tunes and perching on shoulders.",
    toys: [
      { name: "Mirror Bell", likes: true },
      { name: "Hanging Swing", likes: true },
      { name: "Shredding Toy", likes: false }
    ]
  },
  {
    name: "Nibbles",
    type: "rabbit",
    age: 4,
    description: "Timid at first, but very sweet and loves carrots.",
    toys: [
      { name: "Cardboard Tube", likes: true },
      { name: "Wicker Ball", likes: true },
      { name: "Rattle Roll", likes: false }
    ]
  },
  {
    name: "Rocky",
    type: "dog",
    age: 3,
    description: "Protective and loyal, great with kids.",
    toys: [
      { name: "Tennis Ball", likes: true },
      { name: "Squeaky Bone", likes: true },
      { name: "Rope Tug", likes: true }
    ]
  },
  {
    name: "Luna",
    type: "cat",
    age: 1,
    description: "Large and fluffy, enjoys being brushed.",
    toys: [
      { name: "Crinkle Tunnel", likes: true },
      { name: "Catnip Mouse", likes: true }
    ]
  },
  {
    name: "Mango",
    type: "bird",
    age: 2,
    description: "Brightly colored and very social.",
    toys: [
      { name: "Ladder", likes: true },
      { name: "Beaded Chain", likes: false },
      { name: "Treat Puzzle", likes: true }
    ]
  },
  {
    name: "Shadow",
    type: "dog",
    age: 1,
    description: "Obedient and intelligent, trained in commands.",
    toys: [
      { name: "KONG", likes: true },
      { name: "Fetch Stick", likes: true },
      { name: "Puzzle Feeder", likes: true }
    ]
  },
  {
    name: "Snowball",
    type: "rabbit",
    age: 2,
    description: "Very fluffy and enjoys cuddles.",
    toys: [
      { name: "Wood Chew", likes: true },
      { name: "Blanket Square", likes: false }
    ]
  },
  {
    name: "Peaches",
    type: "cat",
    age: 4,
    description: "Calm and affectionate lap cat.",
    toys: [
      { name: "Plush Fish", likes: true },
      { name: "Ball Track", likes: true },
      { name: "Tassel Teaser", likes: false }
    ]
  }
];