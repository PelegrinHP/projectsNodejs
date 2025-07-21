// Router/AuthRoter.js
import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import * as AuthMiddleware from "../middleware/AuthMiddleware.js";
import { validateEmailFormat } from "../middleware/UserMiddleware.js";

/**
 * Defines authentication routes for the application, including login, register, and logout.
 *
 * @param {Object} dbModels - An object containing Sequelize database models.
 * @returns {Router} Express router with authentication-related endpoints.
 */


export const CreateAuthRouter = ({ dbModels }) => {
    const authRouter = Router();
    const authController = new AuthController({ dbModels })

    authRouter.post("/login", AuthMiddleware.validateUserAndPassword ,authController.login);
    authRouter.post("/register",[
        AuthMiddleware.validateUserAndPassword,
        validateEmailFormat
    ], authController.register);
    authRouter.post("/logout",AuthMiddleware.validateToken, authController.logout);

    return authRouter; 
}