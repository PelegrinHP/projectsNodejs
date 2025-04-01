import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export const CreateUserRouter = ({}) => {
  const userRouter = Router();
  const userController = new UserController({});

  userRouter.post("/create", userController.createUser);
  userRouter.get("/", userController.getAllUsers);
  //userRouter.get("/:id", userController.getById);
  //userRouter.put("/:id", userController.updateUser);
  //userRouter.delete("/:id", userController.deleteUser);
  //userRouter.get('/search', userController.findUser);

  return userRouter;
};
