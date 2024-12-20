
import ENVIROMENT from "../config/enviroment.js";
import ResponseBuilder from "../utlis/Builders/responseBuilder.js";

export const authenticate = (roles_permitidos = []) => {
    return (req, res, next) => {
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

            if(roles_permitidos.length && !roles_permitidos.includes(req.user.role)) {
                const response = new ResponseBuilder()
                .setOK(false)
                .setStatus(403)
                .setMessage("Acceso denegado")
                .build();
                return res.status(403).json(response);
            }

            return next();
        } catch (error) {
            return res.status(403).json({
                ok: false,
                status: 403,
                message: "Token inválido o expirado",
            });
        }
    }

};



export const verifyApikeyMiddleware = (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            return res.status(204).send();
        }
        const apikeyHeader = req.headers['x-api-key'];
        if (!apikeyHeader) {
            const response = new ResponseBuilder()
                .setOK(false)
                .setStatus(401)
                .setMessage("API key no proporcionada")
                .build();
            return res.status(401).json(response);
        }

        if (apikeyHeader !== ENVIROMENT.API_KEY_INTERN) {
            const response = new ResponseBuilder()
                .setOK(false)
                .setStatus(403)
                .setMessage("API key inválida")
                .build();
            return res.status(403).json(response);
        }

        next();

    }
    catch (error) {
        const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(500)
            .setMessage("Error interno del servidor apikey")
            .setPayload({ detail: error.message })
            .build();
        return res.status(500).json(response);

    }
}