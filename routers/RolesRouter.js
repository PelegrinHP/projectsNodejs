import { Router } from "express";
import { RoleController } from "../controllers/RolesController.js";
import * as RoleMiddleware from "../middleware/RoleMiddleware.js";
import * as AuthMiddleware from "../middleware/AuthMiddleware.js";

/**
 * Configures and returns the Express router for role management endpoints.
 * 
 * @param {Object} dbModels - Sequelize database models object.
 * @returns {Router} An Express router with role management routes.
 */
export const CreateRoleRouter = ({ dbModels }) => {
    const roleRouter = Router();
    const roleController = new RoleController({ dbModels });

    roleRouter.post('/create', [
        RoleMiddleware.validateDataRole,
        AuthMiddleware.validateToken
    ], roleController.createRole);
    roleRouter.get('/', AuthMiddleware.validateToken , roleController.getAllRoles);
    roleRouter.get('/:id', [
        AuthMiddleware.validateToken,
        RoleMiddleware.isValidRoleById
    ] , roleController.getRoleById);
    roleRouter.put('/:id', RoleMiddleware.validateDataRole, RoleMiddleware.isValidRoleById, roleController.updateRole);
    roleRouter.delete('/:id', RoleMiddleware.isValidRoleById,  roleController.deleteRole);

    return roleRouter
}