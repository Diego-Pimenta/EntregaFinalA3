import { UserController } from "../controllers/userController.js";
import { UserRepository } from "../repositories/userRepository.js";
import { UserService } from "../services/userService.js";
import { userRoutes } from "../routes/userRoutes.js";

export const userModule = (db) => {
  const repository = new UserRepository(db);
  const service = new UserService(repository);
  const controller = new UserController(service);
  return userRoutes(controller);
};
