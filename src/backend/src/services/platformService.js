import { HttpError } from "./exceptions/httpError.js";

export class PlatformService {
  constructor(repository, gameRepository) {
    this.repository = repository;
    this.gameRepository = gameRepository;
  }

  async create({ name }) {
    let existingPlatform = await this.repository.findByName(name);
    if (existingPlatform != null) {
      throw new HttpError(400, "Bad Request! Platform already exists!");
    }
    return this.repository.create({ name });
  }

  async findById(id) {
    const platform = await this.repository.findById(id);
    if (platform == null) {
      throw new HttpError(404, "Platform not found!");
    }
    return platform;
  }

  async findByName(name) {
    const platform = await this.repository.findByName(name);
    if (platform == null) {
      throw new HttpError(404, "Platform not found!");
    }
    return platform;
  }

  findAll() {
    return this.repository.findAll();
  }

  async findPlatformGames(id) {
    const games = await this.repository.findPlatformGames(id);
    return games;
  }

  async addGame(id, gameId) {
    await this.repository.findPlatformGames(id);
    let game = await this.gameRepository.findById(gameId);
    if (game == null) {
      throw new HttpError(400, "Game not found!");
    }
    return this.repository.addGame(id, gameId);
  }

  async removeGame(id, gameId) {
    await this.repository.findById(id);
    const game = await this.gameRepository.findById(gameId);
    if (game == null) {
      throw new HttpError(404, "Game not found!");
    }
    return this.repository.removeGame(id, gameId);
  }

  async update(id, platformDto) {
    let platform = await this.findById(platformDto.id);
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
