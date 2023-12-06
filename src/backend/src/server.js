import express, { Router } from "express";
import DatabaseConnection from "./database/connection.js";
import cors from "cors";
import { userModule } from "./modules/userModule.js";
import { gameModule } from "./modules/gameModule.js";
import { gradeModule } from "./modules/gradeModule.js";
import { statusModule } from "./modules/statusModule.js";
import { platformModule } from "./modules/platformModule.js";
import { errorHandler } from "./middlewares/errorHandler.js";

class Server {
  constructor() {
    this.db = DatabaseConnection.getInstance();
    this.app = express();
    this.configureApp();
  }

  // configures middlewares for the Express
  configureApp() {
    // solution for the same-origin policy, allowing cross-origin HTTP requests
    this.app.use(cors());
    // parses the incoming requests with JSON payloads
    this.app.use(express.json());
    this.setupRoutes();
  }

  setupRoutes() {
    const router = Router();
    router
      .use("/users", userModule(this.db))
      .use("/games", gameModule(this.db))
      .use("/grades", gradeModule(this.db))
      .use("/statuses", statusModule(this.db))
      .use("/platforms", platformModule(this.db))
      .use(errorHandler);
    this.app.use(router);
  }

  startServer(port) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

const PORT = 3001;
const server = new Server();
server.startServer(PORT);
