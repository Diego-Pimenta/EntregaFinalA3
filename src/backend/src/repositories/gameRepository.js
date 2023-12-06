import {
  createQuery,
  deleteQuery,
  findByIdQuery,
  findByTitleQuery,
  findByPlatformIdQuery,
  findAllQuery,
  updateQuery,
} from "./queries/gameQueries.js";
import {
  createGamePlatformQuery,
  updateGamePlatformQuery,
  deleteGamePlatformQuery,
} from "./queries/gamePlatformQueries.js";

export class GameRepository {
  constructor(db) {
    this.db = db;
  }

  async create({
    title,
    description,
    genre,
    price,
    developed_by,
    release_date,
    platform_id,
  }) {
    const createdGame = await this.db.query(createQuery, [
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
    ]);
    await this.associate({ game_id: createdGame.insertId, platform_id });
    return createdGame;
  }

  findById(id) {
    return this.db.query(findByIdQuery, [id]);
  }

  findByPlatform(platform_id) {
    return this.db.query(findByPlatformIdQuery, [platform_id]);
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

  updateAssociation(gameId, { platform_id }) {
    return this.db.query(updateGamePlatformQuery, [platform_id, gameId]);
  }

  disassociate({ game_id }) {
    return this.db.query(deleteGamePlatformQuery, [game_id]);
  }

  async delete(id) {
    await this.disassociate(id);
    return this.db.query(deleteQuery, [id]);
  }

  async update(
    id,
    {
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      platform_id,
    }
  ) {
    await this.updateAssociation(id, { platform_id });
    return this.db.query(updateQuery, [
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      id,
    ]);
  }
}
