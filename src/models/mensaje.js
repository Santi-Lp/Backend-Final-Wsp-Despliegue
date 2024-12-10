import mongoose from "mongoose";

const MensajeSchema = new mongoose.Schema({
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receptor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contenido: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const Mensaje = mongoose.model('Mensaje', MensajeSchema);

export default Mensaje