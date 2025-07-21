
// middleware/UserMiddleware.js
import jwt from 'jsonwebtoken';
import db from '../models/index.js'; 

export const isValidUserById = async (req, res, next) => {
    // TODO: This is implement
    const id = req.params.id;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!id){
        return res.status(404).json({ message : "Id is required"});
    }
    
    if (!uuidRegex.test(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
    }

    const response = await db.User.findOne({
        where: { 
            id: id,
            isActive: true,
        }
    });

    if (!response) {
        return res.status(404).json({ message: "User not found" });
    }

    next();
}

export const validateEmailFormat = async (req, res, next) => {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const allowedDomains = process.env.ALLOWED_DOMAINS ? process.env.ALLOWED_DOMAINS.split(',') : []; // ej: "example.com,miempresa.cl"

    const email = req.body.email;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (email.length > 254) { // longitud máxima RFC 5321
        return res.status(400).json({ message: "Email exceeds maximum length (254 chars)" });
    }

    const [localPart, domain] = email.split("@");

    if (!localPart || !domain) {
        return res.status(400).json({ message: "Email must contain a local part and a domain" });
    }

    if (localPart.length > 64) {
        return res.status(400).json({ message: "Local part exceeds 64 characters" });
    }

    const domainParts = domain.split(".");
    if (domainParts.some(part => part.length > 63)) {
        return res.status(400).json({ message: "One of the domain parts exceeds 63 characters" });
    }

    if (allowedDomains.length && !allowedDomains.includes(domain.toLowerCase())) {
        return res.status(400).json({ message: `Domain '${domain}' is not allowed` });
    }

    next();
}

export const hasPermissions = async (req, res, next) => {
    //// TODO: This is implement
    const token = req.headers['authorization'] || req.headers['token'];
    
    next();
}



export const validateUserData = async (req, res, next) => {
    //// TODO: This is implement
    next();
}

export const validateSearchFilters = async (req, res, next) => {
    //// TODO: This is implement
    next();
}

