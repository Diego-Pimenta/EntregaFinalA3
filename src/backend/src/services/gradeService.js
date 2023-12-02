import { HttpError } from "./exceptions/httpError.js";

export class GradeService {
  constructor(repository, userRepository, gameRepository) {
    this.repository = repository;
    this.userRepository = userRepository;
    this.gameRepository = gameRepository;
  }

  async create({ user_id, game_id, grade }) {
    let user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new HttpError(404, "User not found!");
    }
    let game = await this.gameRepository.findById(game_id);
    if (!game) {
      throw new HttpError(404, "Game not found!");
    }
    return this.repository.create({ user_id, game_id, grade });
  }

  async findById(id) {
    const grade = await this.repository.findById(id);
    if (!grade) {
      throw new HttpError(404, "Grade not found!");
    }
    return grade;
  }

  async findByUserId(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpError(404, "User not found!");
    }
    return this.repository.findByUserId(userId);
  }

  findAll() {
    return this.repository.findAll();
  }

  async delete(id) {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async update(id, gradeDto) {
    await this.findById(id);
    return this.repository.update(id, gradeDto);
  }
}
