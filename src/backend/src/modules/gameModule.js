import { GameController } from "../controllers/gameController.js";
import { GameRepository } from "../repositories/gameRepository.js";
import { GameService } from "../services/gameService.js";
import { gameRoutes } from "../routes/gameRoutes.js";

export const gameModule = (db) => {
  const repository = new GameRepository(db);
  const service = new GameService(repository);
  const controller = new GameController(service);
  return gameRoutes(controller);
};
