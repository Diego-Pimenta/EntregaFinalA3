import { Router } from "express";
import { validation } from "../middlewares/validation.js";
import {
  validateCreateUser,
  validateUpdateUser,
} from "./validations/validateUser.js";

export const userRouter = (userController) => {
  const userRouter = Router();
  userRouter
    .route("/")
    .get((req, res, next) => userController(req, res, next))
    .post(validation(validateCreateUser), (req, res, next) =>
      userController(req, res, next)
    );

  userRouter
    .route("/:id")
    .get((req, res, next) => userController(req, res, next))
    .delete((req, res, next) => userController(req, res, next))
    .put(validation(validateUpdateUser), (req, res, next) =>
      userController(req, res, next)
    );

  return userRouter;
};
