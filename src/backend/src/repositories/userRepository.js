import {
  createQuery,
  deleteQuery,
  findByIdQuery,
  findByUsernameQuery,
  findByEmailQuery,
  findAllQuery,
  updateQuery,
} from "./queries/userQueries.js";

export class UserRepository {
  constructor(db) {
    this.db = db;
  }

  create({ username, email, password, birth_date, gender }) {
    return this.db.query(createQuery, [
      username,
      email,
      password,
      birth_date,
      gender,
    ]);
  }

  delete(id) {
    return this.db.query(deleteQuery, [id]);
  }

  findAll() {
    return this.db.query(findAllQuery);
  }

  findById(id) {
    return this.db.query(findByIdQuery, [id]);
  }

  findByUsername(username) {
    return this.db.query(findByUsernameQuery, [username]);
  }

  findByEmail(email) {
    return this.db.query(findByEmailQuery, [email]);
  }

  update(id, { password }) {
    // password será um obj dto
    return this.db.query(updateQuery, [password, id]);
  }
}
