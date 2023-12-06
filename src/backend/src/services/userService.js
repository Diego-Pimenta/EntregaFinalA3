import { HttpError } from "./exceptions/httpError.js";

export class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async create({ username, email, password, birth_date, gender }) {
    let existingUser = await this.repository.findByUsername(username);
    if (Object.keys(existingUser).length !== 0) {
      throw new HttpError("Bad Request! Username already in use!");
    }
    existingUser = await this.repository.findByEmail(email);
    if (Object.keys(existingUser).length !== 0) {
      throw new HttpError("Bad Request! Email already in use!");
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
    if (Object.keys(user).length === 0) {
      throw new HttpError("User not found!");
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
