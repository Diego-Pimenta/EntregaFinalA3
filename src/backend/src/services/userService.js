import { HttpError } from "./exceptions/httpError.js";

export class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async create({ username, email, password, birth_date, gender }) {
    let existingUser = await this.repository.findByUsername(username);
    if (existingUser != null) {
      throw new HttpError(400, "Bad Request! Username already in use!");
    }
    existingUser = await this.repository.findByEmail(email);
    if (existingUser != null) {
      throw new HttpError(400, "Bad Request! Email already in use!");
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
    if (user == null) {
      throw new HttpError(404, "User not found!");
    }
    return user;
  }

  async findByUsername(username) {
    const user = await this.repository.findByUsername(username);
    if (user == null) {
      throw new HttpError(404, "User not found!");
    }
    return user;
  }

  async findByEmail(email) {
    const user = await this.repository.findByEmail(email);
    if (user == null) {
      throw new HttpError(404, "User not found!");
    }
    return user;
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async update(id, userDto) {
    await this.findById(id);
    return this.repository.update(id, userDto);
  }
}
