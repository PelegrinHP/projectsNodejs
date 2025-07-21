// routers/UserRouter.js
import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import * as UserMiddleware from "../middleware/UserMiddleware.js";

/**
 * Creates user-related routes (CRUD operations).
 *
 * @param {Object} dbModels - Injected Sequelize models.
 * @returns {Router} Express router instance with user endpoints.
 */
export const CreateUserRouter = ({ dbModels }) => {
  const userRouter = Router();
  const userController = new UserController({ dbModels });

  // TODO : this is implement middleware for users.
  userRouter.post("/create", userController.createUser);
  userRouter.get("/", userController.getAllUsers);
  userRouter.get("/:id", UserMiddleware.isValidUserById, userController.getUserById);         
  userRouter.put("/:id", userController.updateUser);
  userRouter.delete("/:id", userController.deleteUser);
  // userRouter.get('/search', userController.findUser);

  return userRouter;
};
