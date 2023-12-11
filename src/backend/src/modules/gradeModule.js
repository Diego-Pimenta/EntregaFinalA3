import { GradeController } from "../controllers/gradeController.js";
import { GradeRepository } from "../repositories/gradeRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { GameRepository } from "../repositories/gameRepository.js";
import { GradeService } from "../services/gradeService.js";
import { gradeRoutes } from "../routes/gradeRoutes.js";

export const gradeModule = (db) => {
  const repository = new GradeRepository(db);
  const userRepository = new UserRepository(db);
  const gameRepository = new GameRepository(db);
  const service = new GradeService(repository, userRepository, gameRepository);
  const controller = new GradeController(service);
  return gradeRoutes(controller);
};
