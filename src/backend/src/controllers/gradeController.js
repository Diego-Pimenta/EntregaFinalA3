export class GradeController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res, next) {
    try {
      const gradeDto = req.body;
      const result = await this.service.create(gradeDto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await this.service.findById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findByUserId(req, res, next) {
    try {
      const userId = req.params.userId;
      const result = await this.service.findByUserId(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findByGameId(req, res, next) {
    try {
      const gameId = req.params.gameId;
      const result = await this.service.findByGameId(gameId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const result = await this.service.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const gradeDto = req.body;
      const result = await this.service.update(id, gradeDto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const result = await this.service.delete(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
