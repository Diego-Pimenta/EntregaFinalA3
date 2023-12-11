import { Router } from "express";

export const authRoutes = (authController) => {
  const authRouter = Router();
  authRouter
    .route("/authenticate")
    .post((req, res, next) => authController.authenticateUser(req, res, next));
  authRouter
    .route("/authorize")
    .get((req, res, next) => authController.authorizeUser(req, res, next));
  return authRouter;
};
