export class GameController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res, next) {
    try {
      const gameDto = req.body;
      const result = await this.service.create(gameDto);
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

  async findByPlatform(req, res, next) {
    try {
      const platformId = req.params.platformId;
      const result = await this.service.findByPlatform(platformId);
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
      const gameDto = req.body;
      const result = await this.service.update(id, gameDto);
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
