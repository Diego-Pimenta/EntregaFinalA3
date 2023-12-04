import { Router } from "express";

export const platformRoutes = (platformController) => {
  const platformRouter = Router();
  platformRouter
    .route("/")
    .get((req, res, next) => platformController.findAll(req, res, next))
    .post((req, res, next) => platformController.create(req, res, next));
  platformRouter
    .route("/:id")
    .get((req, res, next) => platformController.findById(req, res, next))
    .delete((req, res, next) => platformController.delete(req, res, next))
    .put((req, res, next) => platformController.update(req, res, next));
  platformRouter
    .route("/:id/games")
    .get((req, res, next) =>
      platformController.findPlatformGames(req, res, next)
    );
  platformRouter
    .route("/:id/games/:gameId")
    .post((req, res, next) => platformController.addGame(req, res, next))
    .delete((req, res, next) => platformController.removeGame(req, res, next));
  return platformRouter;
};
