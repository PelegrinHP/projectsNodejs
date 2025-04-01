//import db from '../models/index.js';
import bcrypt from "bcryptjs";

/**
 * Servicios para operaciones de usuarios
 */

export class UserServices {
  static async createUser({ req }) {
    return {
      code: 200,
      message: "Probando Ruta psts crear Usuario",
    };
  }
  static async getAllUsers({ req }) {
    return {
      code: 200,
      message: "probando ruta para obtener todos los usuarios",
    };
  }

  static async getById({ id }) {
    return {
      code: 200,
      message: "probando ruta para obtener usuario por id",
    };
  }

  static async updateUser({ id }) {
    return {
      code: 200,
      message: "probando ruta para actualizar un usuario",
    };
  }
  static async deleteUser({ id }) {
    return {
      code: 200,
      message: "probando ruta para eliminar un usuario",
    };
  }
}
