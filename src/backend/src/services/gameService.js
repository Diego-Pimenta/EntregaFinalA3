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
  }) {
    let existingGame = await this.repository.findByTitle(title);
    if (Object.keys(existingGame).length !== 0) {
      throw new HttpError("Bad Request! Game already exists!");
    }
    let imageUrl = await this.imageSearchService.getImageUrl(title);
    return this.repository.create({
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      image: imageUrl,
    });
  }

  async findById(id) {
    const game = await this.repository.findById(id);
    if (Object.keys(game).length === 0) {
      throw new HttpError("Game not found!");
    }
    return game;
  }

  async findByTitle(title) {
    const game = await this.repository.findByTitle(title);
    if (Object.keys(game).length === 0) {
      throw new HttpError("Game not found!");
    }
    return game;
  }

  async findByPlatform(platformId) {
    const games = await this.repository.findByPlatform(platformId);
    if (Object.keys(games).length === 0) {
      throw new HttpError("Games not found!");
    }
    return games;
  }

  async findPlatforms(gameId) {
    const game = await this.repository.findById(gameId);
    if (Object.keys(game).length === 0) {
      throw new HttpError("Game not found!");
    }
    return this.repository.findPlatforms(gameId);
  }

  findAll() {
    return this.repository.findAll();
  }

  async update(
    id,
    { title, description, genre, price, developed_by, release_date }
  ) {
    const game = await this.repository.findByTitle(title);
    if (Object.keys(game).length !== 0) {
      // allows changes to the game properties keeping the same title
      if (game[0].id != id) {
        throw new HttpError(
          "Bad Request! Game with this title already exists!"
        );
      }
    }
    let imageUrl = await this.imageSearchService.getImageUrl(title);
    return this.repository.update(id, {
      title,
      description,
      genre,
      price,
      developed_by,
      release_date,
      image: imageUrl,
    });
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async associate({ game_id, platform_id }) {
    let existingGame = await this.repository.findById(game_id);
    if (Object.keys(existingGame).length === 0) {
      throw new HttpError("Game not found!");
    }
    let existingPlatform = await this.platformRepository.findById(platform_id);
    if (Object.keys(existingPlatform).length === 0) {
      throw new HttpError("Platform not found!");
    }
    return this.repository.associate({ game_id, platform_id });
  }

  async disassociate({ game_id, platform_id }) {
    let existingGame = await this.repository.findById(game_id);
    if (Object.keys(existingGame).length === 0) {
      throw new HttpError("Game not found!");
    }
    let existingPlatform = await this.platformRepository.findById(platform_id);
    if (Object.keys(existingPlatform).length === 0) {
      throw new HttpError("Platform not found!");
    }
    return this.repository.disassociate({ game_id, platform_id });
  }
}
