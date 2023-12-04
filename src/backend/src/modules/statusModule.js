import { StatusController } from "../controllers/statusController.js";
import { StatusRepository } from "../repositories/statusRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { GameRepository } from "../repositories/gameRepository.js";
import { StatusService } from "../services/statusService.js";
import { statusRoutes } from "../routes/statusRoutes.js";

export const statusModule = (db) => {
  const repository = new StatusRepository(db);
  const userRepository = new UserRepository(db);
  const gameRepository = new GameRepository(db);
  const service = new StatusService(repository, userRepository, gameRepository);
  const controller = new StatusController(service);
  return statusRoutes(controller);
};
