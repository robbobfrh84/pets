const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient()

async function main() {
  await prisma.pet.deleteMany()

  await Promise.all(
    pets.map(pet => prisma.pet.create({ data: pet }))
  )

  console.log('Test data seeded 🌰 ✅.')

  // await prisma.pet.create({
  //   data: pets[0]
  // })
  // await prisma.pet.create({
  //   data: pets[1]
  // })
  // await prisma.pet.create({
  //   data: pets[2]
  // })


}

main()
.catch(e => {
  console.error('🌰 ❌ Seed error:', e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
})


const pets = [
  
  {
    "name": "Buddy",
    "type": "dog",
    "breed": "Golden Retriever",
    "age": 3,
    "description": "Friendly and energetic, loves to play fetch."
  },
  {
    "name": "Whiskers",
    "type": "cat",
    "breed": "Siamese",
    "age": 2,
    "description": "Very vocal and curious, loves sunbathing."
  },
  {
    "name": "Coco",
    "type": "bird",
    "breed": "Cockatiel",
    "age": 3,
    "description": "Enjoys whistling tunes and perching on shoulders."
  },
  {
    "name": "Nibbles",
    "type": "rabbit",
    "breed": "Netherland Dwarf",
    "age": 4,
    "description": "Timid at first, but very sweet and loves carrots."
  },
  {
    "name": "Rocky",
    "type": "dog",
    "breed": "Boxer",
    "age": 3,
    "description": "Protective and loyal, great with kids."
  },
  {
    "name": "Luna",
    "type": "cat",
    "breed": "Maine",
    "age": 1,
    "description": "Large and fluffy, enjoys being brushed."
  },
  {
    "name": "Mango",
    "type": "bird",
    "breed": "Sun Conure",
    "age": 2,
    "description": "Brightly colored and very social."
  },
  {
    "name": "Shadow",
    "type": "dog",
    "breed": "German Shepherd",
    "age": 1,
    "description": "Obedient and intelligent, trained in commands."
  },
  {
    "name": "Snowball",
    "type": "rabbit",
    "breed": "Angora",
    "age": 2,
    "description": "Very fluffy and enjoys cuddles."
  },
  {
    "name": "Peaches",
    "type": "cat",
    "breed": "Persian",
    "age": 4,
    "description": "Calm and affectionate lap cat."
  }
]
