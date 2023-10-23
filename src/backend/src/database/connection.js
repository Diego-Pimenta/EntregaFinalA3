import mysql from "mysql2";
import { connectionUri } from "../configs/db.config.js";
import { init } from "./queries/init.js";
import { examples } from "./queries/examples.js";

let instance = null;

export const getDatabaseConnection = () => {
  if (!instance) {
    instance = new DatabaseConnection();
  }
  return instance;
};

class DatabaseConnection {
  constructor() {
    try {
      this.conn = mysql.createConnection(connectionUri, {
        multipleStatements: true,
      });
      this.createTables().then(() => this.insertExamples());
      console.log("Connection has been established successfully.");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  }

  async query(sql) {
    this.conn.query(sql, function (err, results, fields) {
      if (err) throw err;
    });
  }

  async createTables() {
    for (let q of init) {
      await this.query(q);
    }
    console.log("Tables created");
  }

  async insertExamples() {
    try {
      for (let q of examples) {
        await this.query(q);
      }
    } catch (e) {
      console.log("Examples may have been already inserted");
    }
  }
}
