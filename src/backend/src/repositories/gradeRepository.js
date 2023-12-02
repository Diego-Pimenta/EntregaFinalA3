import {
  createQuery,
  deleteQuery,
  findByIdQuery,
  findByUserIdQuery,
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

  findAll() {
    return this.db.query(findAllQuery);
  }

  update(id, { query }) {
    return this.db.query(updateQuery, [query, id]);
  }

  delete(id) {
    return this.db.query(deleteQuery, [id]);
  }
}
