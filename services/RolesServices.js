// services/RoleServices.js

import { where } from "sequelize";

/**
 * Service class responsible for handling role-related business logic.
 */
export class RoleServices{

    /**
     * Creates a new role in the database.
     * 
     * @param {Object} params - Parameters object.
     * @param {Object} params.req - Express request object containing role data in the request body.
     * @param {Object} params.dbModels - Sequelize database models.
     * @returns {Promise<{code: number, message: string}>} - Response object with status code and message.
     */
    static async createRole({ req, dbModels }){
        const {
            name,
            codename
        } = req.body;

        const newRole = await dbModels.Role.create({
            name,
            codename,
            status : true
        });

        return {
            code: 200,
            message : "Role created successfully",
            // data: newRole // Uncomment if you want to return the created role object
        }
    }

    /**
     * Retrieves all active roles from the database.
     * 
     * @param {Object} params - Parameters object.
     * @param {Object} params.dbModels - Sequelize database models.
     * @returns {Promise<{code: number, message: Object[]}>} - Response object containing status code and list of roles.
     */
    static async getAllRoles({ dbModels }){
        const roles = await dbModels.Role.findAll({
            where: { status : true}
        });
        return { code : 200, message: roles}
    }
    
    /**
     * 
     */
    static async getRoleById({ id, dbModels }){
        return {
            code: 200,
            message: await dbModels.Role.findOne({
                where: {
                    id: id,
                    status: true
                }
            })
        }
    }

    /**
     * Updates an existing role in the database.
     * 
     * @param {Object} params - Parameters object.
     * @param {Object} params.req - Express request object containing role ID in params and updated data in body.
     * @param {Object} params.dbModels - Sequelize database models.
     * @returns {Promise<{code: number, message: string}>} - Response object with status code and message.
     */
    static async updateRole({ req, dbModels }){
        
        const role = await dbModels.Role.findOne({
            where :{
                id: req.params.id,
                status : true
            }
        });

        const payload = {
            name: req.body.name ?? role.name,
            status: req.body.status ?? role.status
        };

        await dbModels.Role.update(payload,{
            where : {id : req.params.id}
        });


        return {
             code : 200,
             message : "Role updated successfully"
        }
    }

    /**
     * Soft deletes a role by marking its status as inactive.
     * 
     * @param {Object} params - Parameters object.
     * @param {number} params.id - ID of the role to delete.
     * @param {Object} params.dbModels - Sequelize database models.
     * @returns {Promise<{code: number, message: string}>} - Response object with status code and message.
     */
    static async deleteRole({ id, dbModels}){
       
        const role = await dbModels.Role.findOne({
            where : {
                id : id,
                status : true
            }
        });

        await dbModels.Role.update({
            status: false
        },{
            where : { id : id }
        });

        return {
            code: 200,
            message: "Role deleted successfully"
        }
    }


}