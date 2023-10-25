import mysql from "mysql";
import { init } from "./db.init.js";

const conn = null;

try {
  conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gameslibrary",
  });
  console.log("Connection has been established successfully.");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

//module.exports = conn;
