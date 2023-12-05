import { Router } from "express";

export const gradeRoutes = (gradeController) => {
  const gradeRouter = Router();
  gradeRouter
    .route("/")
    .get((req, res, next) => gradeController.findAll(req, res, next))
    .post((req, res, next) => gradeController.create(req, res, next));
  gradeRouter
    .route("/:id")
    .get((req, res, next) => gradeController.findById(req, res, next))
    .delete((req, res, next) => gradeController.delete(req, res, next))
    .put((req, res, next) => gradeController.update(req, res, next));
  gradeRouter
    .route("/user/:userId")
    .get((req, res, next) => gradeController.findByUserId(req, res, next));
  gradeRouter
    .route("/game/:gameId")
    .get((req, res, next) => gradeController.findByGameId(req, res, next));
  return gradeRouter;
};
