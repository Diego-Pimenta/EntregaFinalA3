import express, { Router } from "express";
import { getDatabaseConnection } from "./database/connection.js";
import { userModule } from "./modules/userModule.js";
import { errorHandler } from "./middlewares/errorHandler.js";

class App {
  constructor() {
    this.db = getDatabaseConnection();
    this.app = express();
    this.routes();
    this.listen();
  }

  routes() {
    const router = Router();
    router.use("/users", userModule(this.db)).use(errorHandler);
    this.app.use(router);
  }

  listen() {
    this.app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  }
}
