// routers/UserRouter.js
import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

/**
 * Creates user-related routes (CRUD operations).
 *
 * @param {Object} dbModels - Injected Sequelize models.
 * @returns {Router} Express router instance with user endpoints.
 */
export const CreateUserRouter = ({ dbModels }) => {
  const userRouter = Router();
  const userController = new UserController({ dbModels });

  /**
   * @route POST /api/v1/users/create
   * @desc Create a new user
   */
  userRouter.post("/create", userController.createUser);

  /**
   * @route GET /api/v1/users/
   * @desc Get all users
   */
  userRouter.get("/", userController.getAllUsers);

  // Future routes:
  userRouter.get("/:id", userController.getUserById);         // Get user by ID
  userRouter.put("/:id", userController.updateUser);          // Update user by ID
  userRouter.delete("/:id", userController.deleteUser);       // Delete user by ID
  // userRouter.get('/search', userController.findUser);         // Search users

  return userRouter;
};
