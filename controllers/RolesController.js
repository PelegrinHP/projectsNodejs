// controllers/RoleController.js
import { RoleServices} from '../services/RolesServices.js';

/**
 * RoleController handles HTTP requests related to role management.
 * It acts as an intermediary between HTTP clients and the RoleServices layer.
 */

export class RoleController{

    /**
     * Creates a new instance of RoleController.
     * @param {Object} params
     * @param {Object} params.dbModels - Sequelize database models.
     */
    constructor ({ dbModels }){
        this.dbModels  = dbModels;
    }

    /**
     * Handles HTTP POST requests to create a new role.
     * Delegates the creation logic to the RoleServices.
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     */
    createRole = async (req, res) => {
        try {
            const response = await RoleServices.createRole({
                req,
                dbModels : this.dbModels
            });
            res.status(response.code).json(response.message);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message : "An error occurred while creating the role"});
        }
    }

    /**
     * Handles HTTP GET requests to retrieve all active roles.
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     */
    getAllRoles = async (req, res) => {
        try {
            const response = await RoleServices.getAllRoles({
                dbModels : this.dbModels
            });
            res.status(response.code).json(response.message);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message : "An error occurred while retrieving Roles."})
        }
    }

    /**
     * 
     */
    getRoleById = async (req, res) => {
        try {
            const response = await RoleServices.getRoleById({
                id: req.params.id,
                dbModels: this.dbModels
            });
            res.status(response.code).json(response.message);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "An error occurred while retrieving a role" });
        }
    }

    /**
     * Handles HTTP PUT requests to update an existing role.
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     */
    updateRole = async (req, res) => {
        try {
            const response = await RoleServices.updateRole({
                req,
                dbModels : this.dbModels
            });
            res.status(response.code).json(response.message);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message : "An error occurred while updating the role"});
        }
    }

    /**
     * Handles HTTP DELETE requests to soft-delete a role.
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     */
    deleteRole = async (req, res) => {
        try {
            const response = await RoleServices.deleteRole({
                id: req.params.id,
                dbModels :  this.dbModels
            });
            res.status(response.code).json(response.message);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message : "An error occurred while deleting the role."});
        }
    }

}