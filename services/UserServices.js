// services/UserServices.js
import bcrypt from "bcryptjs";

/**
 * Service class for user-related business logic.
 */
export class UserServices {

  /**
   * Creates a new user in the database.
   * 
   * @param {Object} options
   * @param {Object} options.req - Express request object containing user data in body
   * @param {Object} options.dbModels - Injected Sequelize database models
   * @returns {Promise<{code: number, message: string}>} - Result of the operation
   */
  static async createUser({ req, dbModels }) {
    const { firstName, lastName, email, password, password_second, cellphone } = req.body;

    if (password !== password_second) {
      return { code: 400, message: 'Passwords do not match' };
    }

    const existingUser = await dbModels.User.findOne({ where: { email } });
    if (existingUser) {
      return { code: 400, message: 'User already exists' };
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await dbModels.User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      cellphone,
      isActive: true
    });
    return { code: 200, message: 'User created successfully with ID: ' + newUser.id };
  }

  /**
   * Retrieves all active users from the database.
   * 
   * @param {Object} options
   * @param {Object} options.dbModels - Injected Sequelize database models
   * @returns {Promise<{code: number, message: Object[]}>} - List of active users
   */
  static async getAllUsers({ dbModels }) {
    const users = await dbModels.User.findAll({
      where: { isActive: true }
    });
    return {code: 200, message: users };
  }

  /**
   * Retrieves a single active user by their unique UUID.
   * 
   * @param {Object} options
   * @param {string} options.id - The UUID of the user to retrieve.
   * @param {Object} options.dbModels - Injected Sequelize database models.
   * @returns {Promise<{code: number, message: Object|null}>} - The found user or null if not found.
   */
  static async getUserById({id ,dbModels}){
    return {
      code : 200,
      message : await dbModels.User.findOne({
        where:  {
          id: id,
          isActive: true
        }
      })
    }
  }

  /**
   * Performs a soft delete on a user by setting their 'isActive' flag to false.
   * 
   * @param {Object} options
   * @param {string} options.id - The UUID of the user to delete.
   * @param {Object} options.dbModels - Injected Sequelize database models.
   * @returns {Promise<{code: number, message: string}>} - Result of the deletion.
   */
  static async deleteUser({id ,dbModels}){
    const user = await dbModels.User.findOne({
      where: {
        id: id,
        isActive : true
      }
    });

    await dbModels.User.update({
      isActive : false
    }, {
      where: {
        id : id
      }
    });

    return {
      code : 200,
      message : "User deleted succesfully"
    }
  }

  /**
   * Updates an existing active user's information based on the request body.
   * Fields not provided in the body will retain their current values.
   * 
   * @param {Object} options
   * @param {Object} options.req - Express request object containing user data in body and UUID in params.
   * @param {Object} options.dbModels - Injected Sequelize database models.
   * @returns {Promise<{code: number, message: string}>} - Result of the update operation.
   */
  static async updateUser({req, dbModels}){

    const user = await dbModels.User.findOne({
      where: {
        id : req.params.id,
        isActive: true
      }
    });

    const payload = {};

    payload.firstName = req.body.firstName ?? user.firstName;
    payload.lastName =  req.body.lastName ?? user.lastName;
    payload.password = req.body.password ? await bcrypt.hash(req.body.password,10): user.password;
    payload.cellphone = req.body.cellphone ?? user.cellphone;

    await dbModels.User.update(payload,
      {
        where: {
          id: req.params.id
        }
      }
    );

    return {
      code: 200,
      message: "User updated successfully"
    }
  }
}
