export class AuthController {
  constructor(service) {
    this.service = service;
  }

  async authenticateUser(req, res, next) {
    try {
      const user = req.body;
      const result = await this.service.authenticateUser(user);
      res.status(200).json({ token: result });
    } catch (error) {
      next(error);
    }
  }

  async authorizeUser(req, res, next) {
    try {
      const token = req.headers.authorization;
      const result = await this.service.authorizeUser(token);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
