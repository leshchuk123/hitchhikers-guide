// const fs = require('fs');
// const { lorem } = require('faker');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Express server run on port ${port}! Everything is good!`);
});

app.get('/api/articles', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3002/articles');
    const data = await response.json();
    res.status(response.status).send({ items: data });
  } catch (err) {
    console.log({err})
    res.status(500).send({ message: err });
  }
});

// app.post('/api/articles', (req, res) => {
  
// })

app.listen(port, () => console.log(`Listening http://localhost:${port}!`));