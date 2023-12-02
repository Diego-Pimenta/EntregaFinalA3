import { Router } from "express";

export const gameRoutes = (gameController) => {
  const gameRouter = Router();
  gameRouter
    .route("/")
    .get((req, res, next) => gameController.findAll(req, res, next))
    .post((req, res, next) => gameController.create(req, res, next));
  gameRouter
    .route("/:id")
    .get((req, res, next) => gameController.findById(req, res, next))
    .delete((req, res, next) => gameController.delete(req, res, next))
    .put((req, res, next) => gameController.update(req, res, next));
  gameRouter
    .route("/platform/:platformId")
    .get((req, res, next) => gameController.findByPlatform(req, res, next));
  return gameRouter;
};
