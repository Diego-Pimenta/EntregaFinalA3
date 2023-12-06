import { PlatformController } from "../controllers/platformController.js";
import { PlatformRepository } from "../repositories/platformRepository.js";
import { PlatformService } from "../services/platformService.js";
import { platformRoutes } from "../routes/platformRoutes.js";

export const platformModule = (db) => {
  const repository = new PlatformRepository(db);
  const service = new PlatformService(repository);
  const controller = new PlatformController(service);
  return platformRoutes(controller);
};
