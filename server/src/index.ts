import { PrismaClient } from "@prisma/client";
import express from "express";
import profileRoutes from "./routes/profile.route";
import userRoutes from "./routes/user.route";
import verficationRoutes from "./routes/verfication.route";

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: express.Application = express();

const port: number = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/profile", profileRoutes);
app.use("/user", userRoutes);
app.use("/verify", verficationRoutes);

app.get("/", (_req, _res) => {
  _res.send("TypeScript With Express");
});

export const prisma = new PrismaClient();

app.listen(port, () => {
  console.log(`
         http://localhost:${port}/`);
});
