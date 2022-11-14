import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import Routes from "./routes/route.js";
import Connection from "./database/db.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", Routes);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const PORT = process.env.PORT || 8080;

Connection(USERNAME, PASSWORD);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
