import {
  createQuery,
  deleteQuery,
  findByUserIdQuery,
  findByGameIdQuery,
  findByIdQuery,
  findAllQuery,
  updateQuery,
} from "./queries/statusQueries.js";

export class StatusRepository {
  constructor(db) {
    this.db = db;
  }

  create({ user_id, game_id, status }) {
    return this.db.query(createQuery, [user_id, game_id, status]);
  }

  findById(id) {
    return this.db.query(findByIdQuery, [id]);
  }

  findByUserId(userId) {
    return this.db.query(findByUserIdQuery, [userId]);
  }

  findByGameId(gameId) {
    return this.db.query(findByGameIdQuery, [gameId]);
  }

  findAll() {
    return this.db.query(findAllQuery);
  }

  update(id, { status }) {
    return this.db.query(updateQuery, [status, id]);
  }

  delete(id) {
    return this.db.delete(deleteQuery, [id]);
  }
}
