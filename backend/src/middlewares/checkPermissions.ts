import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../models/User";
import UserRepository from "../repositories/UserRepository";

async function decoder(request: Request): Promise<User | undefined> {
    const bearerToken = request.headers.authorization || "";

    if (!bearerToken) {
        return undefined;
    }

    const token = bearerToken.split(" ")[1];

    if (!token) {
        return undefined;
    }

    const payload: any = jwt.decode(token)

    if (!payload) {
        return undefined;
    }

    const userId = payload.sub

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId, {
        relations: ["roles"],
    });

    return user;
}

function is(role: String[]) {
    const roleAuthorized = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const user = await decoder(request);

        if (user) {
            const userRoles = user.roles.map((role) => role.name);

            const existsRoles = userRoles.some((r) => role.includes(r));

            if (existsRoles) {
                return next();
            }
        }

        return response.status(401).json({ message: "Not authorized." });
    };

    return roleAuthorized;
}

export { is };
