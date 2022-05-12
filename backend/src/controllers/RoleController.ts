
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import RoleRepository from '../repositories/RoleRepository';
import PermissionReporitory from '../repositories/PermissionRepository';

class RoleController {

  async create(request: Request, response: Response) {
    const roleRepository = getCustomRepository(RoleRepository);

    const permissionReporitory = getCustomRepository(PermissionReporitory);

    const { name, description, permissions } = request.body;

    const existRole = await roleRepository.findOne({ name });

    if (existRole) {
      return response.status(400).json({ err: "Role already exist." });
    }

    const existPermissions = await permissionReporitory.findByIds(permissions);

    const role = roleRepository.create({
      name,
      description,
      permissions: existPermissions
    });

    await roleRepository.save(role);

    return response.json(role);
  }
}

export default new RoleController();
