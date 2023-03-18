import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import UrlRouter from "./router/Urlshortener.router.js";
import usersRouter from "./router/users.router.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 4000;

const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongo is connected 😁");
app.use(express.json());
app.use(cors());

app.use("/", UrlRouter);
app.use("/", usersRouter);

app.listen(PORT, console.log(`server started on port ${PORT} 🔥🔥`));
