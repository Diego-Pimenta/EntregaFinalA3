import { HttpError } from "./exceptions/httpError.js";

export class PlatformService {
  constructor(repository, gameRepository) {
    this.repository = repository;
    this.gameRepository = gameRepository;
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

  async findPlatformGames(id) {
    let platform = await this.repository.findById(id);
    if (platform.length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
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
    let games = await this.findPlatformGames(id);
    for (let game of games) {
      await this.gameRepository.disassociate({
        game_id: game.id,
        platform_id: id,
      });
    }
    return this.repository.delete(id);
  }
}
