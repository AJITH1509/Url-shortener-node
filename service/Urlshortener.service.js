import { client } from "../index.js";

export async function redirectUrl(shorturl) {
  return await client
    .db("b42wd2")
    .collection("urlshortener")
    .findOne({ short_url: shorturl });
}

export async function insertData(url, shortUrl, create_at) {
  return await client.db("b42wd2").collection("urlshortener").insertOne({
    long_url: url,
    short_url: shortUrl,
    create_at: create_at,
  });
}

export async function getUrl() {
  return await client
    .db("b42wd2")
    .collection("urlshortener")
    .find({})
    .toArray();
}
