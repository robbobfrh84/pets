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

// * 🎯 GET a single pet by pet's id
router.get('/pets/:petId', async (req, res) => {  
  console.log("🎯 GET a single pet by pet's id")
  const { petId } = req.params;
  try {
    const pet = await prisma.pet.findUnique({
      where: { pet_id: parseInt(petId) },
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


// * 📫 POST - Create a new pet 

// * 🎊 PUT - update a pet's value

// * ❌ DELETE a pet by Id


module.exports = router