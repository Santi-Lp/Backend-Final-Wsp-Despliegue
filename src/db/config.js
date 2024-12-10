import mongoose from "mongoose";
import ENVIROMENT from "../config/enviroment.js";

mongoose.connect(ENVIROMENT.DB_URL)
.then(
    () => {
        console.log("Conexion exitosa con la base de datos")
    }
)
.catch(
    (error) => {
        console.error("Error al conectar con la base de datos")
    }
)

export default mongoose