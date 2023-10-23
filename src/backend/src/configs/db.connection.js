import mysql from "mysql2";
import { init } from "./db.init.js";
import { examples } from "./db.examples.js";

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
      this.conn = mysql.createConnection("mysql://root:root@localhost:3306/", {
        multipleStatements: true,
      });
      this.createTables().then(() => this.insertExamples());
      console.log("Connection has been established successfully.");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  }

  // test method more precisely
  async query(sql) {
    return new Promise((resolve, reject) => {
      this.conn.query(sql, function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
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
