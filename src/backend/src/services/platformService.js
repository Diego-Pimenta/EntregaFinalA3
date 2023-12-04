import { HttpError } from "./exceptions/httpError.js";

export class PlatformService {
  constructor(repository) {
    this.repository = repository;
  }

  async create({ name }) {
    let existingPlatform = await this.repository.findByName(name);
    if (Object.keys(existingPlatform).length !== 0) {
      throw new HttpError(400, "Bad Request! Platform already exists!");
    }
    return this.repository.create({ name });
  }

  async findById(id) {
    const platform = await this.repository.findById(id);
    if (Object.keys(platform).length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
    return platform;
  }

  async findByName(name) {
    const platform = await this.repository.findByName(name);
    if (Object.keys(platform).length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
    return platform;
  }

  findAll() {
    return this.repository.findAll();
  }

  async findPlatformGames(id) {
    return await this.repository.findPlatformGames(id);
  }

  async update(id, platformDto) {
    let platform = await this.findById(id);
    if (platform.name === platformDto.name) {
      throw new HttpError(
        404,
        "Bad Request! Platform with this title already exists!"
      );
    }
    return this.repository.update(id, platformDto);
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
