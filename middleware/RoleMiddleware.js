// middleware/RoleMiddleware.js
import db from "../models/index.js";
import { Op } from "sequelize";

/**
 * Middleware to check if a role with the provided ID exists and is active.
 * If the role does not exist or is inactive, it returns a 404 response.
 * Otherwise, it passes control to the next middleware.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
export const isValidRoleById = async (req, res, next) => {
    const id = req.params.id;
    const response = await db.Role.findOne({
        where : {
            id : id,
            status : true
        }
    });

    if (!response) {
        return res.status(404).json({ message : "Role not found" });
    }
    next();
}

/**
 * Middleware to validate role data in the request body.
 * - Validates the presence and type of `name` (required in all cases).
 * - Validates the presence and uniqueness of `codename` (only for creation).
 * - Ensures `name` is unique (excluding the current role if updating).
 * 
 * Returns a 400 error if validation fails.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
export const validateDataRole = async (req, res, next) => {
    const { name, codename } = req.body;
    const { id } = req.params;

    if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "Invalid or missing 'name'" });
    }

    // Solo validar codename si es POST
    if (!id) {
        if (!codename || typeof codename !== "string") {
            return res.status(400).json({ message: "Invalid or missing 'codename'" });
        }

        const existingCodename = await db.Role.findOne({ where: { codename } });
        if (existingCodename) {
            return res.status(400).json({ message: "Codename already exists" });
        }
    }

    const existingName = await db.Role.findOne({
        where: {
            name,
            ...(id ? { id: { [Op.ne]: id } } : {})
        }
    });

    if (existingName) {
        return res.status(400).json({ message: "Name already exists" });
    }

    next();
};
