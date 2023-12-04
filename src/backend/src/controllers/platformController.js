export class PlatformController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res, next) {
    try {
      const platformDto = req.body;
      const result = await this.service.create(platformDto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async addGame(req, res, next) {
    try {
      const { id, gameId } = req.params;
      const result = this.service.addGame(id, gameId);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeGame(req, res, next) {
    try {
      const { id, gameId } = req.params;
      const result = this.service.removeGame(id, gameId);
      res.status(200).json(result);
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

  async findPlatformGames(req, res, next) {
    try {
      const id = req.params.id;
      const result = await this.service.findPlatformGames(id);
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
      const platformDto = req.body;
      const result = await this.service.update(id, platformDto);
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
