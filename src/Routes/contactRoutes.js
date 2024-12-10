import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { AñadirContacto, obtenerContactos}from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/agregar" , authenticate, AñadirContacto)
contactRouter.get("/obtener", authenticate, obtenerContactos)


export default contactRouter;
