import { GameController } from "../controllers/gameController.js";
import { GameRepository } from "../repositories/gameRepository.js";
import { PlatformRepository } from "../repositories/platformRepository.js";
import { GameService } from "../services/gameService.js";
import { ImageSearchService } from "../services/imageSearchService.js";
import { gameRoutes } from "../routes/gameRoutes.js";

export const gameModule = (db) => {
  const repository = new GameRepository(db);
  const platformRepository = new PlatformRepository(db);
  const imageSearchService = new ImageSearchService();
  const service = new GameService(
    repository,
    platformRepository,
    imageSearchService
  );
  const controller = new GameController(service);
  return gameRoutes(controller);
};
