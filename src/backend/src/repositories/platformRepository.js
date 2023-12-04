import {
  createQuery,
  deleteQuery,
  findByIdQuery,
  findByNameQuery,
  findPlatformGamesQuery,
  findAllQuery,
  updateQuery,
} from "./queries/platformQueries.js";
import {
  createGamePlatformQuery,
  deleteGamePlatformQuery,
} from "./queries/gamePlatformQueries.js";

export class PlatformRepository {
  constructor(db) {
    this.db = db;
  }

  create({ name }) {
    return this.db.query(createQuery, [name]);
  }

  findById(id) {
    return this.db.query(findByIdQuery, [id]);
  }

  findPlatformGames(id) {
    return this.db.query(findPlatformGamesQuery, [id]);
  }

  findByName(name) {
    return this.db.query(findByNameQuery, [name]);
  }

  findAll() {
    return this.db.query(findAllQuery);
  }

  addGame(id, gameId) {
    return this.db.query(createGamePlatformQuery, [gameId, id]);
  }

  removeGame(id, gameId) {
    return this.db.query(deleteGamePlatformQuery, [gameId, id]);
  }

  update(id, { name }) {
    return this.db.query(updateQuery, [name, id]);
  }

  delete(id) {
    return this.db.query(deleteQuery, [id]);
  }
}
