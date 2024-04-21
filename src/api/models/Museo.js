const mongoose = require("mongoose")

const museoSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  imagen: { type: String, require: true },
  cuadros: [{ type: mongoose.Types.ObjectId, ref: "cuadros", require: false }]

}, {
  timestamps: true,
  collection: "museos"
})

const Museo = mongoose.model("museos", museoSchema, "museos")

module.exports = Museo