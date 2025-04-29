// controllers/UserController.js
import { UserServices } from "../services/UserServices.js";


/**
 * Controller class for handling user-related HTTP requests.
 */
export class UserController {

  /**
   * @param {Object} dbModels - Injected Sequelize database models.
   */
  constructor({ dbModels }) {
    this.dbModels = dbModels;
  }

  /**
   * Handles user creation.
   * 
   * @route POST /api/v1/users/create
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createUser = async (req, res) => {
    try {
      const response = await UserServices.createUser({ req, dbModels: this.dbModels });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating user" });
    }
  };

  /**
   * Retrieves all users.
   * 
   * @route GET /api/v1/users/
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllUsers = async (req, res) => {
    try {
      const response = await UserServices.getAllUsers({ dbModels: this.dbModels });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting users" });
    }
  };

  /**
   * Docuemntar en ingles
   */

  getUserById= async (req,res) =>{
    try {
      const response = await UserServices.getUserById({
        id: req.params.id,
        dbModels : this.dbModels
      });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error getting user"});      
    }
  }

  /**
   * Documentra en ingles
   */
  deleteUser = async(req,res) => {
    try {
      const response = await UserServices.deleteUser({
        id: req.params.id,
        dbModels : this.dbModels
      });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message : "Error"
      });
    }
  }

  /**
   * Documentar en ingles
   */
  updateUser = async(req,res) => {
    try {
      const response = await UserServices.updateUser({
        req,
        dbModels: this.dbModels
      });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message : "Error"
      })
    }
  }
}
