import express from "express";
import { getDatabaseConnection } from "./database/connection.js";

const app = express();
const db = getDatabaseConnection();

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
