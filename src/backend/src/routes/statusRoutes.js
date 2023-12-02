import { Router } from "express";

export const statusRoutes = (statusController) => {
  const statusRouter = Router();
  statusRouter
    .route("/")
    .get((req, res, next) => statusController.findAll(req, res, next))
    .post((req, res, next) => statusController.create(req, res, next));
  statusRouter
    .route("/:id")
    .get((req, res, next) => statusController.findById(req, res, next))
    .delete((req, res, next) => statusController.delete(req, res, next))
    .put((req, res, next) => statusController.update(req, res, next));
  statusRouter
    .route("/user/:userId")
    .get((req, res, next) => statusController.findByUserId(req, res, next));
  statusRouter
    .route("/game/:gameId")
    .get((req, res, next) => statusController.findByGameId(req, res, next));
  return statusRouter;
};
