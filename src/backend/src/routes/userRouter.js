import { Router } from "express";
import {} from "../middlewares/validation.js";

// alterações devem ser feitas após a conclusão do userController
export const userRouter = (userController) => {
  const userRouter = Router();
  userRouter
    .route("/")
    .get((req, res, next) => userController())
    .post((req, res, next) => userController());

  userRouter
    .route("/:id")
    .get((req, res, next) => userController())
    .delete((req, res, next) => userController())
    .put((req, res, next) => userController());

  return userRouter;
};
