// controllers/AuthController.js
import { AuthServices} from "../services/AuthServices.js";
import { UserServices } from "../services/UserServices.js";

/**
 * AuthController handles HTTP requests related to authentication,
 * including login, logout, and user registration.
 */
export class AuthController{

    /**
     * Constructs the AuthController with database models.
     * 
     * @param {Object} options
     * @param {Object} options.dbModels - Sequelize database models.
     */
    constructor({ dbModels }){
        this.dbModels = dbModels;
    }

    /**
     * Handles user login.
     * Validates credentials and returns a session token if successful.
     *
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     */
    login = async (req, res) => {
        try {
            const response = await AuthServices.login({
                email: req.body.email,
                password: req.body.password,
                dbModels: this.dbModels
              });
            res.status(response.code).json(response.message);
            
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error authentication"
            })
        }
    }

    /**
     * Handles user logout.
     * Invalidates the user's session token.
     *
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     */
    logout = async (req,res) =>{
        try {
            const response = await AuthServices.logout({
                token: req.headers.token,
                dbModels: this.dbModels
            });
            res.status(response.code).json(response.message)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error authentication"
            })
        }
    }

    /**
     * Handles user registration.
     * Creates a new user in the database.
     *
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     */
    register = async (req,res) =>{
        try {
            const response = await UserServices.createUser({ req, dbModels: this.dbModels });
            res.status(response.code).json(response.message);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error creating user" });
        }
    }
}