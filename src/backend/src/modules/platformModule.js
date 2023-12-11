import { PlatformController } from "../controllers/platformController.js";
import { PlatformRepository } from "../repositories/platformRepository.js";
import { GameRepository } from "../repositories/gameRepository.js";
import { PlatformService } from "../services/platformService.js";
import { platformRoutes } from "../routes/platformRoutes.js";

export const platformModule = (db) => {
  const repository = new PlatformRepository(db);
  const gameRepository = new GameRepository(db);
  const service = new PlatformService(repository, gameRepository);
  const controller = new PlatformController(service);
  return platformRoutes(controller);
};
