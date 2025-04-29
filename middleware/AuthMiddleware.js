// middleware/AuthMiddleware.js
import db from '../models/index.js'; 

/**
 * Middleware to validate presence of user email and password in the request body.
 * Returns 400 if any of them is missing.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
export const validateUserAndPassword = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    next();
};

/**
 * Middleware to validate authentication token provided in request headers.
 * Checks if token exists, is valid, and not expired.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
export const validateToken = async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(401).json({ message: 'No Token' });
    }
    const session = await db.Session.findOne({
        where: {
            token: req.headers.token
        }
    });
    if (!session) {
        return res.status(401).json({
            message: 'Wrong Token'
        });
    }
    if (new Date(session.expiration) < new Date()) {
        return res.status(401).json({
            message: 'Expired Token'
        });
    }
    next();
};
