import { HttpError } from "./exceptions/httpError.js";

export class PlatformService {
  constructor(repository) {
    this.repository = repository;
  }

  async create({ name }) {
    let existingPlatform = await this.repository.findByName(name);
    if (existingPlatform.length !== 0) {
      throw new HttpError(409, "Conflict! Platform already exists!");
    }
    return this.repository.create({ name });
  }

  async findById(id) {
    const platform = await this.repository.findById(id);
    if (platform.length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
    return platform;
  }

  async findByName(name) {
    const platform = await this.repository.findByName(name);
    if (platform.length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
    return platform;
  }

  findAll() {
    return this.repository.findAll();
  }

  findPlatformGames(id) {
    return this.repository.findPlatformGames(id);
  }

  async update(id, { name }) {
    let platform = await this.repository.findByName(name);
    if (platform.length !== 0) {
      if (platform[0].id != id) {
        throw new HttpError(
          409,
          "Conflict! Platform with this name already exists!"
        );
      }
    }
    return this.repository.update(id, { name });
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
