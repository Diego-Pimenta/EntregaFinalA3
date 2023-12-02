import express, { Router } from "express";
import { getDatabaseConnection } from "./database/connection.js";
import cors from "cors";
import { userModule } from "./modules/userModule.js";
import { gameModule } from "./modules/gameModule.js";
import { gradeModule } from "./modules/gradeModule.js";
import { statusModule } from "./modules/statusModule.js";
import { errorHandler } from "./middlewares/errorHandler.js";

class App {
  constructor() {
    this.db = getDatabaseConnection();
    this.app = express();
    this.middlewares();
    this.routes();
    this.listen();
  }

  middlewares() {
    // solution for the same-origin policy, allowing cross-origin HTTP requests
    this.app.use(cors());
    // parses the incoming request with JSON payloads
    this.app.use(express.json());
  }

  routes() {
    const router = Router();
    router
      .use("/users", userModule(this.db))
      .use("/games", gameModule(this.db))
      .use("/grades", gradeModule(this.db))
      .use("/statuses", statusModule(this.db))
      .use(errorHandler);
    this.app.use(router);
  }

  listen() {
    this.app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  }
}

let x = new App();
