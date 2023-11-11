import mysql from "mysql2";
import { connectionUrl } from "../configs/db.config.js";
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
      // create MySQL connection and allow multipleStatements so we can run our scripts with multiple lines
      this.conn = mysql.createConnection(connectionUrl, {
        multipleStatements: true,
      });
      this.createTables().then(() => this.insertExamples());
      console.log("Connection has been established successfully.");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  }

  async query(sql, params = []) {
    // method to run our sql scripts using Promise
    return new Promise((resolve, reject) => {
      this.conn.query(sql, params, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
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
