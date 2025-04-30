// controllers/UserController.js
import { UserServices } from "../services/UserServices.js";


/**
 * Controller class for handling user-related HTTP requests.
 */
export class UserController {

  /**
   * Initialized the UserController with the provided database models.
   * 
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
   * @returns {Promise<void>}
   */
  createUser = async (req, res) => {
    try {
      const response = await UserServices.createUser({ req, dbModels: this.dbModels });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while creating the user." });
    }
  };

  /**
   * Retrieves all users.
   * 
   * @route GET /api/v1/users/
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<void>}
   */
  getAllUsers = async (req, res) => {
    try {
      const response = await UserServices.getAllUsers({ dbModels: this.dbModels });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while retrieving users." });
    }
  };

  /**
   * Retrieves a user by their unique ID.
   * 
   * @route GET /api/v1/users/:id
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>}
   */

  getUserById= async (req, res) => {
    try {
      const response = await UserServices.getUserById({
        id: req.params.id,
        dbModels : this.dbModels
      });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error occurred while retrieving the user."});      
    }
  }

  /**
   * Deletes a user by their unique ID
   * 
   * @route DELETE /api/v1/users/:id
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>}
   */
  deleteUser = async(req, res) => {
    try {
      const response = await UserServices.deleteUser({
        id: req.params.id,
        dbModels : this.dbModels
      });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message : "An error occurred while deleting the user."
      });
    }
  }

  /**
   * Updates an existing user.
   * 
   * @route PUT /api/v1/users/:id
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>}
   */
  updateUser = async(req, res) => {
    try {
      const response = await UserServices.updateUser({
        req,
        dbModels: this.dbModels
      });
      res.status(response.code).json(response.message);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message : "An error occurred while updating the user."
      })
    }
  }
  
}
