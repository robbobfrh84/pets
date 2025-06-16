const express = require('express');
const path = require('path'); // * Allows us to serve html files. 
const app = express();
const PORT = 3000;

app.use(express.json()); // * Converts request body's to json
app.use(express.static(path.join(__dirname, 'public'))); // * Serve static files from the 'public' folder

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})


/* 📬 ... 📬 Additional Example Requests 📬 ... 📬 */

// * TEXT Response
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to my app!</h1> </br> Now visit: /home`);
})

// * HTML Response
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

// * JSON Response
app.get('/json', (req, res) => {
  res.json({ name:'Sal', number: 49 });
})

// * GET - Filter pets by age using Query Parameters
app.get('/pets_filter', (req, res) => {    
  const { query } = req;
  const key = Object.keys(query)[0];
  const value = query[key];
  const matchingPets = pets.filter(pet => pet[key] == value);
  res.json(matchingPets);
})


/* 🧑‍💻 ... 🧑‍💻 API Requests 🧑‍💻 ... 🧑‍💻 */
let { pets } = require('./pets.json');

// * GET all pets
app.get('/pets', (req, res) => {
  res.json(pets);
})

// * GET a single pet by pet's id
app.get('/pets/:petId', (req, res) => {  
  const petId = parseInt(req.params.petId);
  const pet = pets.find(pet => pet.id === petId);
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).send('Pet not found');
  }
})

// * POST - Create a new pet 
app.post('/pets', (req, res) => {
  const maxId = Math.max(...pets.map(pet => pet.id));  
  const newPet = {
    id: maxId + 1,
    ...req.body
  }
  pets.push(newPet);
  res.status(201).json(newPet);
})

// * PUT - update a pet's value
app.put('/pets/:petId', (req, res) => {  
  const { petId } = req.params  
  const petIndex = pets.findIndex(pet => pet.id === parseInt(petId))

  if (petIndex !== -1) {
    const updatedPetInfo = req.body
    pets[petIndex] = { ...pets[petIndex], ...updatedPetInfo }
    res.json(pets[petIndex])
  } else {
    res.status(404).send('Pet not found')
  }
})

// * DELETE a pet by Id
app.delete('/pets/:petId', (req, res) => {
  const { petId } = req.params
  const initialLength = pets.length
  pets = pets.filter(pet => pet.id !== parseInt(petId))

  if (pets.length < initialLength) {
    res.status(204).send()
  } else {
    res.status(404).send('Pet not found')
  }
})

/* ... Pet's Toys ... */
