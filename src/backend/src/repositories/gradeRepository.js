import {
  createQuery,
  deleteQuery,
  findByIdQuery,
  findByUserIdQuery,
  findByGameIdQuery,
  findAllQuery,
  updateQuery,
} from "./queries/gradeQueries.js";

export class GradeRepository {
  constructor(db) {
    this.db = db;
  }

  create({ user_id, game_id, grade }) {
    return this.db.query(createQuery, [user_id, game_id, grade]);
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

  update(id, { grade }) {
    return this.db.query(updateQuery, [grade, id]);
  }

  delete(id) {
    return this.db.query(deleteQuery, [id]);
  }
}
