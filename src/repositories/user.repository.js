import User from "../models/User.js";

class UserRepository {
    static async createUser(user) {
        return await User.create(user); 
    }

    static async agregarContacto(userId, contactId) {
        return await User.findByIdAndUpdate(userId, {
            $push: { contacto: contactId }
        });                                          
    }

    static async encontrarContactosPorUsuario(query) { 
        return await User.findOne(query); 
    }

    static async encontrarContactosPorId(userId) {
        const user = await User.findById(userId);
        return user.contacto;
    }
    static async encontrarContactos (query){
        return User.findById(query).populate('contacto',"name" );
    }
}

export default UserRepository;
