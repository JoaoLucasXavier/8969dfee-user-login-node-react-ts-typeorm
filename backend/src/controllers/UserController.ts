import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import UserRepository from "../repositories/UserRepository";
import RoleRepository from "../repositories/RoleRepository";
import jwt from "jsonwebtoken";

class UserController {
  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const roleRepository = getCustomRepository(RoleRepository);

    const { name, username, password, roles } = request.body;

    const existUser = await userRepository.findOne({ username });

    if (existUser) {
      return response.status(400).json({ message: "User already exists." });
    }

    const existRoles = await roleRepository.findByIds(roles);

    const passwordHashed = await hash(password, 8);

    const user = userRepository.create({
      name,
      username,
      password: passwordHashed,
      roles: existRoles,
    });

    await userRepository.save(user);

    return response.status(201).json({
      id: user.id,
      name: user.name,
      username: user.username,
      created_at: user.created_at,
    });
  }

  async roles(request: Request, response: Response) {
    const bearerToken = request.headers.authorization || "";
    const token = bearerToken.split(" ")[1];

    try {
      if (!token) {
        return response.status(401).json({ message: "Not authorized." });
      }

      const payload: any = jwt.decode(token);

      if (!payload) {
        return response.status(401).json({ message: "Not authorized." });
      }

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne(payload.sub, {
        relations: ["roles"],
      });

      if (!user) {
        return response.status(404).json({ message: "User not found." });
      }

      const roles = user.roles.map((role) => role.name);

      return response.status(201).json(roles);
    } catch (error) {
      return response.status(400).send();
    }
  }
}

export default new UserController();
