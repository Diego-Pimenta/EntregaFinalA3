export class UserController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res, next) {
    try {
      const userDto = req.body;
      const result = await this.service.create(userDto);
      res.status(201).json(result);
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

  async findById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await this.service.findById(id);
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

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const userDto = req.body;
      const result = await this.service.update(id, userDto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
