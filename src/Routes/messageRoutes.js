import express from "express";
import { enviarMensaje, obtenerMensajes } from "../controllers/messageController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const mensajeRouter = express.Router();

mensajeRouter.post("/enviar", authenticate ,enviarMensaje);
mensajeRouter.get("conversacion/:receptor_id", obtenerMensajes);

export default mensajeRouter;