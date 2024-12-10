import UserRepository from "../repositories/user.repository.js";
import ResponseBuilder from "../utlis/Builders/responseBuilder.js";

const AñadirContacto = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {contact_name} = req.body;
        const name_found = await UserRepository.encontrarContactosPorUsuario({name: contact_name});
        if(!name_found){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(404)
            .setMessage("El contacto no existe")
            .build();
            return res.status(404).json(response);
        }
        const user = await UserRepository.encontrarContactosPorUsuario({ _id: user_id });
        if(user.contacto.includes(name_found._id)){
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "El contacto ya existe",
            });
        }
        await UserRepository.agregarContacto(user_id, name_found._id);

        const response = new ResponseBuilder()
            .setOK(true)
            .setStatus(201)
            .setMessage("Contacto añadido correctamente")
            .build();
        return res.status(201).json(response);
    }
    catch (error) {
        console.error("Error al anadir contacto", error);
        const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(500)
            .setMessage("Error interno del servidor")
            .setPayload({ detail: error.message })
            .build();
        return res.status(500).json(response);
    }
}


const obtenerContactos = async (req, res) => {

    try {
        const user_id = req.user.id;
        const user = await UserRepository.encontrarContactos(user_id);
        if (!user) {
            const response = new ResponseBuilder()
                .setOK(false)
                .setStatus(404)
                .setMessage("No se encontraron contactos")
                .build();
            return res.status(404).json(response);
        }
        const response = new ResponseBuilder()
            .setOK(true)
            .setStatus(200)
            .setMessage("Contactos encontrados")
            .setPayload(user.contacto)
            .build();
        return res.status(200).json(response);
    }
    catch (error) {
}
}
export {AñadirContacto, obtenerContactos}