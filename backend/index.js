const fs = require("fs");
// const { lorem } = require('faker');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Express server run on port ${port}! Everything is good!`);
});

app.get("/api/articles", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3002/articles");
    const data = await response.json();
    res.status(response.status).send({ items: data });
  } catch (err) {
    console.log({ err });
    res.status(500).send({ message: err });
  }
});

app.get("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`http://localhost:3002/articles/${id}`);
    const data = await response.json();
    const buffer = fs.readFileSync(`./docs/${id}.md`);
    data.body = buffer.toString();
    res.status(response.status).send({ data });
  } catch (err) {
    console.log({ err });
    res.status(500).send({ message: err });
  }
});

app.post("/api/articles", async (req, res) => {
  const { data } = req.body;
  const { id, body, ...rest } = data;
  const date = new Date().toISOString();
  try {
    const response = await fetch(`http://localhost:3002/articles/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rest,
        dateCreated: date,
        dateModified: date,
      }),
    });
    const json = await response.json();
    const { id } = json;
    fs.writeFileSync(`./docs/${id}.md`, body);
    res.status(response.status).send({ body, ...json });
  } catch (err) {
    console.error({ err });
    res.status(500).send({ message: err });
  }
});

app.patch("/api/articles", async (req, res) => {
  const { data } = req.body;
  const { id, body, ...rest } = data;
  const date = new Date().toISOString();
  try {
    let response = await fetch(`http://localhost:3002/articles/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let old_data = await response.json();
    response = await fetch(`http://localhost:3002/articles/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...old_data,
        ...rest,
        dateModified: date,
      }),
    });
    json = await response.json();
    fs.writeFileSync(`./docs/${id}.md`, body);
    res.status(response.status).send({ body, ...json });
  } catch (err) {
    console.error({ err });
    res.status(500).send({ message: err });
  }
});

app.listen(port, () => console.log(`Listening http://localhost:${port}!`));
