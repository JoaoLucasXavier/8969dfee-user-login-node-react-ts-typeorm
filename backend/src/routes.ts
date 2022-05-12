import { Router } from "express";
import AuthController from "./controllers/AuthController";
import PermissionController from "./controllers/PermissionController";
import ProductController from "./controllers/ProductController";
import RoleController from "./controllers/RoleController";
import UserController from "./controllers/UserController";
import { is } from "./middlewares/checkPermissions";

const router = Router();

router.post("/login", AuthController.signIn);
router.post("/permissions", PermissionController.create);
router.post("/roles", RoleController.create);
router.post("/users", UserController.create);

router.get("/users/roles", UserController.roles);

router.post("/product", is(["ROLE_ADMIN"]), ProductController.create);
router.get("/product", is(["ROLE_ADMIN"]), ProductController.index);
router.get("/product/:id", is(["ROLE_ADMIN"]), ProductController.show);
// // router.get("/product/:id", is(["ROLE_ADMIN", "ROLE_USER", "ROLE_CUSTOMER"]), ProductController.show);

export { router };
