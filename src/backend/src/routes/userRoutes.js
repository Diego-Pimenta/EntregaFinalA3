import { Router } from "express";

export const userRoutes = (userController) => {
  const userRouter = Router();
  userRouter
    .route("/")
    .get((req, res, next) => userController.findAll(req, res, next))
    .post((req, res, next) => userController.create(req, res, next));
  userRouter
    .route("/:id")
    .get((req, res, next) => userController.findById(req, res, next))
    .delete((req, res, next) => userController.delete(req, res, next))
    .put((req, res, next) => userController.update(req, res, next));
  return userRouter;
};
