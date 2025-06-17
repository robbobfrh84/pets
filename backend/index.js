const express = require('express');
const path = require('path'); // * Allows us to serve html files. 
const app = express();
const PORT = 3000;

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

app.use(express.json()); // * Converts request body's to json
app.use(express.static(path.join(__dirname, 'public'))); // * Serve static files from the 'public' folder

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})


/* 📬  ...  📬 Example Requests 📬  ...  📬 */

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

let { pets } = require('./petsJson.json'); // (🚨HARDCODED Pets Object)
app.get('/pets_filter', (req, res) => {    
  const { query } = req;
  const key = Object.keys(query)[0];
  const value = query[key];
  const matchingPets = pets.filter(pet => pet[key] == value);
  res.json(matchingPets);
})
