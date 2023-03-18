import express from "express";
import shortid from "shortid";
import { auth } from "../auth.js";
const router = express.Router();
import {
  getUrl,
  insertData,
  redirectUrl,
} from "../service/Urlshortener.service.js";

router.get("/", function (req, res) {
  res.send("vanakamda mapla");
});

router.get("/urls", auth, async function (req, res) {
  const result = await getUrl();
  if (result) {
    res.send(result.splice(-1));
  } else {
  }
});

router.post("/shorten", auth, async function (req, res) {
  const { url } = req.body;
  const shortUrl = shortid.generate(url);
  const now = new Date();
  const create_at = now.toLocaleString();
  const result = await insertData(url, shortUrl, create_at);
  if (result) {
    res.send({ message: "inserted successfully", result: result });
  } else {
    res.status(401).send("Not authorized");
  }
});

router.get("/:shorturl", async function (req, res) {
  const { shorturl } = req.params;
  const urlFromDb = await redirectUrl(shorturl);
  if (!urlFromDb) {
    res.status(401).send({ message: "invalid url" });
  } else {
    res.redirect(urlFromDb.long_url);
  }
});

export default router;
