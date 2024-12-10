import nodemailer from "nodemailer";
import ENVIROMENT from "./enviroment.js";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: ENVIROMENT.EMAIL_USER,
        pass: ENVIROMENT.EMAIL_PASS
    }
})

export default transporter