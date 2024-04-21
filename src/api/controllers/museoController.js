const { deleteFile } = require("../../utils/deleteFiles.js")
const Museo = require("../models/Museo.js")

const getMuseoById = async (req, res, next) => {
  try {
    const { id } = req.params
    const museo = await Museo.findById(id).populate("cuadros")
    return res.status(200).json(museo)

  } catch (error) {
    return res.status(400).json("No se encontró ningún museo po ID")
  }
}




const getMuseos = async (req, res, next) => {
  try {
    const museos = await Museo.find().populate("cuadros")
    return res.status(200).json(museos)

  } catch (error) {
    return res.status(400).json("No se encontró ningún museo")
  }
}



const postMuseo = async (req, res, next) => {
  try {
    const newMuseo = new Museo(req.body)

    if (req.file) {
      newMuseo.imagen = req.file.path
    }

    const museoSaved = await newMuseo.save()
    return res.status(200).json(museoSaved)

  } catch (error) {
    return res.status(400).json("No se ha creado ningún museo")
  }
}



const putMuseo = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldMuseo = await Museo.findById(id)
    const newMuseo = new Museo(req.body)
    newMuseo._id = id
    const cuadros = req.body.cuadros || []
    newMuseo.cuadros = [...oldMuseo.cuadros, ...cuadros]

    if (req.file) {
      newMuseo.imagen = req.file.path
      deleteFile(oldMuseo.imagen)
    }

    const museoUpdated = await Museo.findByIdAndUpdate(id, newMuseo, { new: true })
    return res.status(200).json(museoUpdated)

  } catch (error) {
    return res.status(400).json("No se actualizó ningún museo")
  }
}



const deleteMuseo = async (req, res, next) => {
  try {
    const { id } = req.params
    const museoDeleted = await Museo.findByIdAndDelete(id)
    deleteFile(museoDeleted.imagen)
    return res.status(200).json(museoDeleted)
  } catch (error) {
    return res.status(400).json("No se eliminó ningún museo")
  }
}



module.exports = { getMuseoById, getMuseos, postMuseo, putMuseo, deleteMuseo }