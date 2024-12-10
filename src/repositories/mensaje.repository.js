import Mensaje from "../models/mensaje.js";

class MensajeRepository {

    static async crearMensajes(dataMensaje){
        return Mensaje.create(dataMensaje)
    }

    static async obtenerMensajesEntreUsuarios( idUsuario1, idUsuario2 ) {
        return Mensaje.find({
            $or: [
                { autor: idUsuario1, receptor: idUsuario2 },
                { autor: idUsuario2, receptor: idUsuario1 }
            ]
        })
    }
}

export default MensajeRepository