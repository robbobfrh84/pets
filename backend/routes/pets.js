const express = require('express');
const router = express.Router();

const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();


// * 🗂️🗂️🗂️ GET all pets
router.get('/pets', async (req, res) => { 
  console.log('🗂️🗂️🗂️ GET all /pets')
  try {
    const pets = await prisma.pet.findMany();
    res.status(200).json({ pets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

// * 📫 POST - Create a new pet 
router.post('/pets', async (req, res) => {
  console.log("📫 POST - Create a new pet");
  try {
    const newPet = await prisma.pet.create({
      data: { ...req.body }
    });
    res.status(201).json({ pet: newPet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create pet' });
  }
});

// * 🎯 GET a single pet by pet's id
router.get('/pets/:petId', async (req, res) => {  
  console.log("🎯 GET a single pet by pet's id")
  const { petId } = req.params;
  try {
    const pet = await prisma.pet.findUnique({
      where: { pet_id: parseInt(petId) },
      include: { toys: true }
    });
    if (!pet) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    res.status(200).json({ pet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// * ❌ DELETE a pet by Id
router.delete('/pets/:petId', async (req, res) => {
  console.log("❌ DELETE a pet by Id");
  const { petId } = req.params;
  try {
    await prisma.toy.deleteMany({ where: { pet_id: parseInt(petId) } });
    await prisma.pet.delete({ where: { pet_id: parseInt(petId) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(500).json({ error: 'Failed to delete pet' });
  }
});


// * 📫 POST - Create a new toy by pet ID. 
router.post('/pets/:petId/toys', async (req, res) => {
  console.log("📫 POST - Create a new toy by pet ID");
  const { petId } = req.params;
  const { name, likes } = req.body;
  try {
    const toy = await prisma.toy.create({
      data: {
        ...req.body,
        pet: {
          connect: { pet_id: parseInt(petId) }
        }
      }
    });
    res.status(201).json({ toy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create toy' });
  }
});


// * 🛠️ PUT - update a pet's value
router.put('/toys/:toyId', async (req, res) => {
  console.log("🛠️ PUT - Update a toy's 'likes'");
  const { toyId } = req.params;
  try {
    const updatedToy = await prisma.toy.update({
      where: { toy_id: parseInt(toyId) },
      data: { ...req.body }
    });
    res.status(200).json({ toy: updatedToy });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Toy not found' });
    }
    res.status(500).json({ error: 'Failed to update toy' });
  }
});

// * ❌ DELETE a toy by Id
router.delete('/toys/:toyId', async (req, res) => {
  console.log("❌ DELETE a toy by Id");
  const { toyId } = req.params;
  try {
    await prisma.toy.delete({ where: { toy_id: parseInt(toyId) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Toy not found' });
    }
    res.status(500).json({ error: 'Failed to delete toy' });
  }
});

module.exports = router