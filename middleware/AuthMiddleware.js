// middleware/AuthMiddleware.js
import jwt from 'jsonwebtoken';
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
    const token = req.headers['authorization'] || req.headers['token'];
    
    if (!token) {
        return res.status(401).json({ message: 'No Token' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }

        const session = await db.Session.findOne({
            where: {
                userId: decoded.id,
                token: token,
            }
        });

        if (!session) {
            return res.status(401).json({
                message: 'Session not found or token does not match',
            });
        }

        if (new Date(session.expiration) < new Date()) {
            return res.status(401).json({
                message: 'Expired Token',
            });
        }

        req.user = decoded;
        next();
    });
};
