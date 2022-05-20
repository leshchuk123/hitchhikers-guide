const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const request = require('request');
const { lorem } = require('faker');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Express server run on port ${port}! Everything is good!`);
});

app.get('/articles', (req, res) => {
  request(
    'http://localhost:3002/articles',
    (err, response, body) => {
      if (err) return res.status(500).send({ message: err });
      return res.status(response.status).send({ items: JSON.parse(body) });
    }
  );
});


app.listen(port, () => console.log(`Listening http://localhost:${port}!`));