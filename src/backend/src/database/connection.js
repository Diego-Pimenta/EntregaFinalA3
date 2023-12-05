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
      console.log("Connection has been established successfully");
    } catch (error) {
      console.error("Unable to connect to the database: ", error);
    }
  }

  async query(sql, params = []) {
    // method to run our sql scripts
    return new Promise((resolve, reject) => {
      this.conn.query(sql, params, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async createTables() {
    for (let query of init) {
      await this.query(query);
    }
    console.log("Tables created");
  }

  async insertExamples() {
    try {
      for (let query of examples) {
        await this.query(query);
      }
    } catch (error) {
      console.log("Examples may already exist");
    }
  }
}
