import {
  createQuery,
  deleteQuery,
  findByIdQuery,
  findByTitleQuery,
  findByPlatformIdQuery,
  findPlatformsQuery,
  findAllQuery,
  updateQuery,
} from "./queries/gameQueries.js";
import {
  createGamePlatformQuery,
  deleteGamePlatformQuery,
} from "./queries/gamePlatformQueries.js";

export class GameRepository {
  constructor(db) {
    this.db = db;
  }

  create({
    title,
    description,
    genre,
    price,
    developed_by,
    release_date,
    image,
  }) {
    return this.db.query(createQuery, [
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      image,
    ]);
  }

  findById(id) {
    return this.db.query(findByIdQuery, [id]);
  }

  findByPlatform(platform_id) {
    return this.db.query(findByPlatformIdQuery, [platform_id]);
  }

  findPlatforms(game_id) {
    return this.db.query(findPlatformsQuery, [game_id]);
  }

  findByTitle(title) {
    return this.db.query(findByTitleQuery, [title]);
  }

  findAll() {
    return this.db.query(findAllQuery);
  }

  associate({ game_id, platform_id }) {
    return this.db.query(createGamePlatformQuery, [game_id, platform_id]);
  }

  disassociate({ game_id, platform_id }) {
    return this.db.query(deleteGamePlatformQuery, [game_id, platform_id]);
  }

  delete(id) {
    return this.db.query(deleteQuery, [id]);
  }

  update(
    id,
    { title, description, genre, price, developed_by, release_date, image }
  ) {
    return this.db.query(updateQuery, [
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      image,
      id,
    ]);
  }
}
