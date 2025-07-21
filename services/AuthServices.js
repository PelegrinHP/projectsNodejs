// services/AuthServices.js
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

/**
 * AuthServices provides authentication-related operations such as login and logout.
 */

export class AuthServices {

    /**
     * Attempts to log in a user using the provided credentials.
     * If an active session already exists, returns the existing token.
     *
     * @param {Object} params - Login parameters.
     * @param {string} params.email - User email.
     * @param {string} params.password - User password.
     * @param {Object} params.dbModels - Sequelize database models.
     * @returns {Promise<Object>} Response object with HTTP-like code and token/message.
     */
    static async login ({ email, password, dbModels }){

        const response = await dbModels.User.findOne({
            where: {
                email: email,
                isActive: true
            },
            include: dbModels.Role
        });

        if (!response || !bcrypt.compare(password, response.password)) {
            return {
                code: 401,
                message: "Unauthorized"
            };
        }
        
        const existingSession = await dbModels.Session.findOne({
            where: {
                userId: response.id,
                expiration: {
                    [dbModels.Sequelize.Op.gt]: new Date()
                }
            }
        })

        if (existingSession) {
            return {
                code: 200,
                message: {
                    message: "Already logged in with an active session",
                    token: existingSession.token
                }
            }
        }

        const payload = {
            firstName : response.firstName,
            lastName : response.lastName,
            id: response.id,
            email : response.email,
            roles: [response.Role?.name || 'guest'],
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        const session = {
            userId: response.id,
            token,
            expiration: new Date(Date.now() + 3600000) 
        }

        await dbModels.Session.create(session);

        return {
            code: 200,
            message: token
        }
    }

    /**
     * Logs out a user by expiring the session associated with the given token.
     *
     * @param {Object} params - Logout parameters.
     * @param {string} params.token - Session token to invalidate.
     * @param {Object} params.dbModels - Sequelize database models.
     * @returns {Promise<Object>} Response object with status message.
     */
    static async logout({ token , dbModels}){
        const session = await dbModels.Session.findOne({
            where: {
                token : token
            }
        });

        session.expiration = new Date();
        await session.save(); 

        return {
            code: 200,
            message : "Logged out"
        }
    }
}