import { EntityRepository, Repository } from "typeorm";
import Permission from "../models/Permission";

@EntityRepository(Permission)
class PermissionReporitory extends Repository<Permission> { }

export default PermissionReporitory;
