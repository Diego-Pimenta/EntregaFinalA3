import { HttpError } from "./exceptions/httpError.js";

export class GameService {
  constructor(repository, platformRepository) {
    this.repository = repository;
    this.platformRepository = platformRepository;
  }

  async create(gameDto) {
    let existingGame = await this.repository.findByTitle(gameDto.title);
    if (existingGame) {
      throw new HttpError(400, "Bad Request! Game already exists!");
    }
    let existingPlatform = await this.platformRepository.findById(
      gameDto.platform_id
    );
    if (!existingPlatform) {
      throw new HttpError(404, "Platform not found!");
    }
    return this.repository.create(gameDto);
  }

  async findById(id) {
    const game = await this.repository.findById(id);
    if (!game) {
      throw new HttpError(404, "Game not found!");
    }
    return game;
  }

  async findByTitle(title) {
    const game = await this.repository.findByTitle(title);
    if (!game) {
      throw new HttpError(404, "Game not found!");
    }
    return game;
  }

  findByPlatform(platformId) {
    return this.repository.findByPlatform(platformId);
  }

  findAll() {
    return this.repository.findAll();
  }

  async update(id, gameDto) {
    let game = await this.findByTitle(gameDto.title);
    if (game.title === gameDto.title) {
      throw new HttpError(
        404,
        "Bad Request! Game with this title already exists!"
      );
    }
    return this.repository.update(id, gameDto);
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
