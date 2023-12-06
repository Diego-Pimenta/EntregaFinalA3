import { HttpError } from "./exceptions/httpError.js";

export class StatusService {
  constructor(repository, userRepository, gameRepository) {
    this.repository = repository;
    this.userRepository = userRepository;
    this.gameRepository = gameRepository;
  }

  async create({ user_id, game_id, status }) {
    let user = await this.userRepository.findById(user_id);
    if (Object.keys(user).length === 0) {
      throw new HttpError("User not found!");
    }
    let game = await this.gameRepository.findById(game_id);
    if (Object.keys(game).length === 0) {
      throw new HttpError("Game not found!");
    }
    return this.repository.create({ user_id, game_id, status });
  }

  async findById(id) {
    const status = await this.repository.findById(id);
    if (Object.keys(status).length === 0) {
      throw new HttpError("Status not found!");
    }
    return status;
  }

  async findByUserId(userId) {
    const user = await this.userRepository.findById(userId);
    if (Object.keys(user).length === 0) {
      throw new HttpError("User not found!");
    }
    return this.repository.findByUserId(userId);
  }

  async findByGameId(gameId) {
    const game = await this.gameRepository.findById(gameId);
    if (Object.keys(game).length === 0) {
      throw new HttpError("Game not found!");
    }
    return this.repository.findByGameId(gameId);
  }

  findAll() {
    return this.repository.findAll();
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async update(id, statusDto) {
    await this.findById(id);
    return this.repository.update(id, statusDto);
  }
}
