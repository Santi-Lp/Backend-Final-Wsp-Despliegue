import jwt from "jsonwebtoken";
import ENVIROMENT from "../config/enviroment.js";

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
        return res.status(401).json({
            ok: false,
            status: 401,
            message: "Token de autenticación no proporcionado",
        });
    }

    try {
        const decoded = jwt.verify(token, ENVIROMENT.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({
            ok: false,
            status: 403,
            message: "Token inválido o expirado",
        });
    }
};


