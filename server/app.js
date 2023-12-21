import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

const apiUrl = "https://officiallondontheatre.com/wp-json/shows/all-open";

app.use(express.static('images'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/shows', async (req, res) => {
  const fileContent = await fs.readFile('./data/shows.json');
  const showsData = JSON.parse(fileContent);
  res.status(200).json({ shows: showsData });
});

async function fetchShowsFromAPI() {
  try {
    console.log("Fetching shows");
    const res = await fetch(apiUrl);
    if(!res.ok) {
      throw new Error(res.status+" "+res.statusText);
    }
    const shows = await res.json();
    await fs.writeFile("./data/shows.json", JSON.stringify(shows))
  } catch (error) {
    console.log(error);
  }
}

app.listen(3000, function () {
  console.log("Express server listening on port 3000");
  fetchShowsFromAPI();
  setInterval(fetchShowsFromAPI, 300000);
});