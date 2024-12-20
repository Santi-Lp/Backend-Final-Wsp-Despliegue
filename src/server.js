import ENVIROMENT from "./config/enviroment.js";
import express from "express";
import mongoose from "./db/config.js";
import statusRouter from "./Routes/status.router.js";
import authRouter from "./Routes/authRoutes.js";
import mensajeRouter from "./Routes/messageRoutes.js";
import contactRouter from "./Routes/contactRoutes.js";
import cors from "cors";
import { verifyApikeyMiddleware } from "./middlewares/authMiddleware.js";




const app = express();
const PORT = ENVIROMENT.PORT || 5000;

const corsOptions = {
    origin: ["http://localhost:5173", "https://proyecto-frontend-final-wsp-despliegue.vercel.app" ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
}    

app.use(cors(corsOptions))
app.use(express.json());
app.use(verifyApikeyMiddleware)


app.use("/api/status" , statusRouter)
app.use("/api/auth" ,  authRouter)
app.use("/api/mensajes" , mensajeRouter)
app.use("/api/contactos", contactRouter)





app.listen(PORT, () => {
    console.log(`El servido esta corriendo en http://localhost:${PORT}`);
})