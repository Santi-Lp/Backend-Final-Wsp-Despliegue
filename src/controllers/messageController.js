
import MensajeRepository from "../repositories/mensaje.repository.js";
import ResponseBuilder from "../utlis/Builders/responseBuilder.js";

export const enviarMensaje = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { receptor_id, contenido } = req.body;

        const mensaje = await MensajeRepository.crearMensajes({
            autor : user_id,
            receptor : receptor_id,
            contenido : contenido,
        });

        const response = new ResponseBuilder()
            .setOK(true)
            .setStatus(201)
            .setMessage("Mensaje enviado correctamente")
            .setPayload(mensaje)
            .build();
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error al enviar mensaje", error);
        const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(500)
            .setMessage("Error interno del servidor")
            .setPayload({ detail: error.message })
            .build();
        return res.status(500).json(response);
    }
};

export const obtenerMensajes = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {receptor_id} = req.params;
        const conversacion = await MensajeRepository.obtenerMensajesEntreUsuarios(user_id, receptor_id);

        const response = new ResponseBuilder()
            .setOK(true)
            .setStatus(200)
            .setMessage("Mensajes obtenidos correctamente")
            .setPayload(conversacion)
            .build();
        return res.status(200).json(response);


        
    } catch (error) {
        console.error("Error al obtener mensajes", error);
        const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(500)
            .setMessage("Error interno del servidor")
            .setPayload({ detail: error.message })
            .build();
        return res.status(500).json(response);
    }
};
