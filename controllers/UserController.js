import { UserServices} from '../services/UserServices.js';
/**
 * Controlador para operaciones de usuarios
 */

export class UserController{

    // constructor({ UsersModels }) {
    //     this.UsersModels = UsersModels;
    // }

    createUser = async (req,res) => {
        try {
            const response = await UserServices.createUser(req,res);
            res.status(response.code).json(response.message)
        } catch (err) {
            console.error(err);
            res.status(500).json(
                {
                    message : 'Error creating user'
                }
            )
        }
    }
}