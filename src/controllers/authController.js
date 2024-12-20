import ENVIROMENT from "../config/enviroment.js";
import User from "../models/User.js";
import ResponseBuilder from "../utlis/Builders/responseBuilder.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utlis/mailUtil.js";
import UserRepository from "../repositories/user.repository.js";



export const register = async (req, res ) => {
    try{
        const { name, email, password, number} = req.body;
        const existenUser = await UserRepository.encontrarContactosPorUsuario({ email: email })
        if(existenUser){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(400)
            .setMessage("El email ya existe")
            .build()
            return res.status(400).json(response)
        }

        const existenUserNumber = await UserRepository.encontrarContactosPorUsuario({ number: number })
        if(existenUserNumber){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(400)
            .setMessage("El numero ya existe")
            .build()
            return res.status(400).json(response)
        }

        const hashedPassword = await bycrypt.hash(password, 10)
        const verificationToken = jwt.sign({ email: email }, ENVIROMENT.JWT_SECRET, { expiresIn: "1d" })

        const url_verify = `${ENVIROMENT.URL_FRONT}/api/auth/verify/${verificationToken}`;

        await sendEmail({
            to: email,
            subject: "Verificacion de cuenta",
            html: `
                <h1>Verificacion de cuenta</h1>
                <p>Para verificar tu cuenta haz click en el siguiente link</p>
                <a style= "color:blue"; "background-color: "black"; border-raduis: 5px
                href="${url_verify}"
                >Click aqui </a> 
            `
        })

        const user = await UserRepository.createUser({
            name,
            email,
            password: hashedPassword,
            number,
            verificationToken: verificationToken
        })

        const response = new ResponseBuilder()
        .setOK(true)
        .setStatus(201)
        .setMessage("El usuario se ha registrado correctamente")
        .build()
        return res.status(201).json(response)
    }
    catch(error){
        console.error("Error al registrar usuario", error)
        const response = new ResponseBuilder()
        .setOK(false)
        .setStatus(500)
        .setMessage("Internal server error")
        .setPayload({
            detail: error.message
        })
        .build()
        return res.status(500).json(response)
    }
}


export const verifyEmailValidationTokenController = async (req, res) =>  {
    try{
        const { verificationToken } = req.params;
        if(!verificationToken){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(400)
            .setMessage("El token es requerido")
            .build()
            return res.status(400).json(response)
        }
        const decoded = jwt.verify(verificationToken, ENVIROMENT.JWT_SECRET)
        const user = await UserRepository.encontrarContactosPorUsuario({email: decoded.email})

        if(!user){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(400)
            .setMessage("El token es invalido")
            .build()
            return res.status(400).json(response)
    }
        if(user.emailVerified){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(400)
            .setMessage("El usuario ya esta verificado")
            .build()
            return res.status(400).json(response)
    }
        user.emailVerified = true
        
        await user.save();
        const response = new ResponseBuilder()
        .setOK(true)
        .setStatus(200)
        .setMessage("El usuario ha sido verificado")
        .build()
        return res.status(200).json(response)

    
    }
    catch(error){
        console.error("Error al verificar el email", error)

    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await UserRepository.encontrarContactosPorUsuario({ email: email })
        if(!user){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(404)
            .setMessage("El usuario no existe")
            .build()
            return res.status(404).json(response)
        }
        if(!user.emailVerified){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(403)
            .setMessage("El usuario no ha sido verificado")
            .build()
            return res.status(403).json(response)
        }
        const isValidPassword = await bycrypt.compare(password, user.password);
        if(!isValidPassword){
            const response = new ResponseBuilder()
            .setOK(false)
            .setStatus(400)
            .setMessage("La contraseña es incorrecta")
            .build()
            return res.status(400).json(response)
        }
        const token = jwt.sign({email: user.email, id: user._id, rol: user.rol}, ENVIROMENT.JWT_SECRET, {expiresIn: "1d"})
        const response = new ResponseBuilder()
        .setOK(true)
        .setStatus(200)
        .setMessage("Login exitoso")
        .setPayload({
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                rol : user.rol

            }
        })
        .build()
        return res.status(200).json(response)
    }
    catch(error){
        const response = new ResponseBuilder()
        .setOK(false)
        .setStatus(500)
        .setMessage("Internal server error")
        .setPayload({
            detail: error.message
        })
        .build()
        return res.status(500).json(response)
    }
    
}
