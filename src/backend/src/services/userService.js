import { HttpError } from "./exceptions/httpError.js";

export class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(userDto) {
    let existingUser = await this.findByUsername(userDto.username);
    if (existingUser) {
      throw new HttpError(400, "Bad Request! User already exists!");
    }
    existingUser = await this.findByEmail(userDto.email);
    if (existingUser) {
      throw new HttpError(400, "Bad Request! User already exists!");
    }
    return this.repository.create(userDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new HttpError(404, "User not found!");
    }
    return user;
  }

  async findByUsername(username) {
    const user = await this.repository.findByUsername(username);
    if (!user) {
      throw new HttpError(404, "User not found!");
    }
    return user;
  }

  async findByEmail(email) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
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
