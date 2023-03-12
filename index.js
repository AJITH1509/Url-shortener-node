import express from "express";
import { MongoClient } from "mongodb";
import shortid from "shortid";

const app = express();
app.use(express.json());

const PORT = 4000;

const MONGO_URL = "mongodb://127.0.0.1";
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongo is connected 😁");
app.get("/", function (req, res) {
  res.send("vanakamda mapla");
});

app.get("/urls", async function (req, res) {
  const result = await client
    .db("b42wd2")
    .collection("urlshortener")
    .find({})
    .toArray();
  res.send(result);
});

app.post("/shorten", async function (req, res) {
  const { url } = req.body;
  const shortUrl = shortid.generate(url);
  const now = new Date();
  const create_at = now.toLocaleString();

  const result = await client
    .db("b42wd2")
    .collection("urlshortener")
    .insertOne({
      long_url: url,
      short_url: shortUrl,
      create_at: create_at,
    });
  res.send({ message: "inserted successfully", result: result });
});

app.get("/:shorturl", async function (req, res) {
  const { shorturl } = req.params;
  const urlFromDb = await client
    .db("b42wd2")
    .collection("urlshortener")
    .findOne({ short_url: shorturl });
  if (!urlFromDb) {
    res.status(401).send({ message: "invalid url" });
  } else {
    res.redirect(urlFromDb.long_url);
  }

  console.log(urlFromDb);
});

app.listen(PORT, console.log(`server started on port ${PORT} 🔥🔥`));
