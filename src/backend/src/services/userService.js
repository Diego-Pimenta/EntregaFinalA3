import { HttpError } from "./exceptions/httpError.js";

export class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async create({ username, email, password, birth_date, gender }) {
    let existingUser = await this.repository.findByUsername(username);
    if (existingUser.length !== 0) {
      throw new HttpError(409, "Conflict! Username already in use!");
    }
    existingUser = await this.repository.findByEmail(email);
    if (existingUser.length !== 0) {
      throw new HttpError(409, "Conflict! Email already in use!");
    }
    return this.repository.create({
      username,
      email,
      password,
      birth_date,
      gender,
    });
  }

  findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    const user = await this.repository.findById(id);
    if (user.length === 0) {
      throw new HttpError(404, "User not found!");
    }
    return user;
  }

  async findByEmail(email) {
    const user = await this.repository.findByEmail(email);
    if (user.length === 0) {
      throw new HttpError(404, "User not found!");
    }
    return user;
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async update(id, { password }) {
    await this.findById(id);
    return this.repository.update(id, { password });
  }
}
