import { HttpError } from "./exceptions/httpError.js";

export class GameService {
  constructor(repository, platformRepository) {
    this.repository = repository;
    this.platformRepository = platformRepository;
  }

  async create({
    title,
    description,
    genre,
    price,
    developed_by,
    release_date,
    platform_id,
  }) {
    let existingGame = await this.repository.findByTitle(title);
    if (Object.keys(existingGame).length !== 0) {
      throw new HttpError(400, "Bad Request! Game already exists!");
    }
    let existingPlatform = await this.platformRepository.findById(platform_id);
    if (Object.keys(existingPlatform).length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
    return this.repository.create({
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      platform_id,
    });
  }

  async findById(id) {
    const game = await this.repository.findById(id);
    if (Object.keys(game).length === 0) {
      throw new HttpError(404, "Game not found!");
    }
    return game;
  }

  async findByTitle(title) {
    const game = await this.repository.findByTitle(title);
    if (Object.keys(game).length === 0) {
      throw new HttpError(404, "Game not found!");
    }
    return game;
  }

  async findByPlatform(platformId) {
    const game = await this.repository.findByPlatform(platformId);
    if (Object.keys(game).length === 0) {
      throw new HttpError(404, "Game not found!");
    }
    return game;
  }

  findAll() {
    return this.repository.findAll();
  }

  async update(id, gameDto) {
    console.log(gameDto.title);
    const game = await this.repository.findByTitle(gameDto.title);
    console.log({ game });
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
