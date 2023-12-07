import { UserRepository } from "../repositories/userRepository.js";
import { UserService } from "../services/userService.js";
import { AuthService } from "../services/authService.js";
import { AuthController } from "../controllers/authController.js";
import { authRoutes } from "../routes/authRoutes.js";

export const authModule = (db) => {
  const userRepository = new UserRepository(db);
  const userService = new UserService(userRepository);
  const service = new AuthService(userService);
  const controller = new AuthController(service);
  return authRoutes(controller);
};
