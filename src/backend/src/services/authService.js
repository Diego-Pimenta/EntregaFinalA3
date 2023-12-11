import { HttpError } from "./exceptions/httpError.js";
import { jwtSecret } from "../configs/config.js";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(userService) {
    this.userService = userService;
  }

  async authenticateUser({ email, password }) {
    let user = await this.userService.findByEmail(email);
    if (password !== user[0].password) {
      throw new HttpError(401, "Invalid credentials!");
    }
    const token = jwt.sign({ userId: user[0].id }, jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  }

  async authorizeUser(token) {
    try {
      if (!token) {
        throw new HttpError(401, "Token not provided!");
      }
      let decoded = jwt.verify(token, jwtSecret);
      const user = await this.userService.findById(decoded.userId);
      if (!user) {
        throw new HttpError(403, "User not authorized!");
      }
      return user;
    } catch (error) {
      throw new HttpError(401, "Invalid token or expired!");
    }
  }
}
