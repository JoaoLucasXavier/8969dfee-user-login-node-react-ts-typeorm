import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";

class AuthController {
  async signIn(request: Request, response: Response) {
    const { username, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ username }, { relations: ["roles"] });

    if (!user) {
      return response.status(400).json({ message: "User not found." });
    }

    const mathPasswords = await compare(password, user.password);

    if (!mathPasswords) {
      return response.status(400).json({ message: "Incorret password or username." });
    }

    const userRoles = user.roles.map(role => role.name);

    // Abaixo estamos passando o  "subject" e "expiresIn" ao nosso token que por sua vez usaremos no middleware "checkPermission"
    const token = sign({ userRoles }, "d41d8cd98f00b204e9800998ecf8427e", { subject: user.id, expiresIn: "1d" });

    return response.json({ token, user });
  }
}

export default new AuthController();
