import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

export const CreateUserRouter = ({  }) =>{

    const userRouter = Router();
    const userController = new UserController ({  });

    userRouter.post('/create',userController.createUser);

    return userRouter;
}