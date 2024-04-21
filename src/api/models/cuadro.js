const mongoose = require("mongoose")

const cuadroSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  imagen: { type: String, require: true },
  autor: { type: String, require: true },
  precio: { type: Number, require: true },
  categoria: { type: String, require: true, enum: ["clásico", "barroco", "realismo", "impresionismo", "modernismo", "cubismo", "Surrealismo", "Pop-art", "digital"] },
  verified: { type: Boolean, required: true, default: false }
}, {
  timestamps: true,
  collection: "cuadros"
})

const Cuadro = mongoose.model("cuadros", cuadroSchema, "cuadros")

module.exports = Cuadro