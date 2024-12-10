import transporter from "../config/transporter.config.js"


const sendEmail = async (options) => {   
    try{
        await transporter.sendMail(options)
    }
    catch(error){
        console.error("Error al enviar el email", error)
        throw error
    }
}

export  {sendEmail}