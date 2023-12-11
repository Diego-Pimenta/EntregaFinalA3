import mysql from "mysql2";
import { connectionUrl } from "../configs/config.js";
import { init } from "./queries/init.js";
import { examples } from "./queries/examples.js";

export default class DatabaseConnection {
  constructor() {
    this.conn = null;
    this.connect();
  }

  static #instance = null; // variable for storing the singleton instance

  // returns an instance of the class if it does not exist, else creates a new one
  static getInstance() {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection();
    }
    return DatabaseConnection.#instance;
  }

  // establishes the database connection
  connect() {
    try {
      this.conn = mysql.createConnection(connectionUrl, {
        multipleStatements: true,
      });
      // connects to the database
      this.conn.connect((error) => {
        if (error) {
          console.error("Unable to connect to the database:", error);
        } else {
          console.log("Connection has been established successfully");
          this.setupDatabase();
        }
      });
    } catch (error) {
      console.error("Error establishing database connection:", error);
    }
  }

  // runs a query on the database
  async query(sql, params = []) {
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

  // sets up the database by creating tables and inserting examples
  async setupDatabase() {
    await this.createTables();
    await this.insertExamples();
  }

  async createTables() {
    try {
      for (let query of init) {
        await this.query(query);
      }
      console.log("Tables created");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  }

  async insertExamples() {
    try {
      for (let query of examples) {
        await this.query(query);
      }
      console.log("Examples inserted");
    } catch (error) {
      console.log("Examples may already exist");
    }
  }
}
