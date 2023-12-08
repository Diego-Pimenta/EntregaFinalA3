import { HttpError } from "./exceptions/httpError.js";

export class GameService {
  constructor(repository, platformRepository, imageSearchService) {
    this.repository = repository;
    this.platformRepository = platformRepository;
    this.imageSearchService = imageSearchService;
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
    if (existingGame.length !== 0) {
      throw new HttpError(409, "Conflict! Game already exists!");
    }
    let existingPlatform = await this.platformRepository.findById(platform_id);
    if (existingPlatform.length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
    let imageUrl = await this.imageSearchService.getImageUrl(title);
    const createdGame = await this.repository.create({
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      image: imageUrl,
    });
    await this.associate({ game_id: createdGame.insertId, platform_id });
    return createdGame;
  }

  async findById(id) {
    const game = await this.repository.findById(id);
    if (game.length === 0) {
      throw new HttpError(404, "Game not found!");
    }
    return game;
  }

  async findByTitle(title) {
    const game = await this.repository.findByTitle(title);
    if (game.length === 0) {
      throw new HttpError(404, "Game not found!");
    }
    return game;
  }

  async findByPlatform(platformId) {
    const games = await this.repository.findByPlatform(platformId);
    if (games.length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
    return games;
  }

  async findPlatforms(gameId) {
    let game = await this.repository.findById(gameId);
    if (game.length === 0) {
      throw new HttpError(404, "Game not found!");
    }
    const platforms = await this.repository.findPlatforms(gameId);
    if (platforms.length === 0) {
      throw new HttpError(404, "Platforms not found!");
    }
    return platforms;
  }

  findAll() {
    return this.repository.findAll();
  }

  async update(
    id,
    {
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      platform_id,
    }
  ) {
    let game = await this.repository.findByTitle(title);
    if (game.length !== 0) {
      if (game[0].id != id) {
        throw new HttpError(
          409,
          "Conflict! Game with this title already exists!"
        );
      }
    }
    let platform = await this.platformRepository.findById(platform_id);
    if (platform.length === 0) {
      throw new HttpError(404, "Platform not found!");
    }
    let imageUrl = await this.imageSearchService.getImageUrl(title);
    const gameDto = await this.repository.update(id, {
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      image: imageUrl,
    });
    await this.updateAssociation({ game_id: id, platform_id });
    return gameDto;
  }

  async delete(id) {
    await this.findById(id);
    let platforms = await this.findPlatforms(id);
    for (let platform of platforms) {
      await this.disassociate({ game_id: id, platform_id: platform.id });
    }
    return this.repository.delete(id);
  }

  async updateAssociation({ game_id, platform_id }) {
    await this.disassociate({ game_id, platform_id });
    await this.associate({ game_id, platform_id });
  }

  associate({ game_id, platform_id }) {
    return this.repository.associate({ game_id, platform_id });
  }

  disassociate({ game_id, platform_id }) {
    return this.repository.disassociate({ game_id, platform_id });
  }
}
