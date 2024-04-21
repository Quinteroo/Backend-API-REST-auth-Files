const Cuadro = require("../models/cuadro.js")
const { deleteFile } = require("../../utils/deleteFiles.js")

const getCuadroById = async (req, res, next) => {
  try {
    const { id } = req.params
    const cuadro = await Cuadro.findById(id)
    return res.status(200).json(cuadro)

  } catch (error) {
    return res.status(400).json("No se encontró ningún cuadro po ID")
  }
}



const getCuadroByCategory = async (req, res, next) => {
  try {
    const { categoria } = req.params
    const cuadro = await Cuadro.find({ categoria })
    return res.status(200).json(cuadro)

  } catch (error) {
    return res.status(400).json("No se encontró ningún cuadro por Categoría")
  }
}



const getCuadroByPrice = async (req, res, next) => {
  try {
    const { price } = req.params
    const cuadros = await Cuadro.find({ precio: { $lt: precio } })
    return res.status(200).json(cuadros)
  } catch (error) {
    return res.status(400).json("No se encontró ningún cuadro con ese Precio")
  }
}



const getCuadros = async (req, res, next) => {
  try {
    const cuadros = await Cuadro.find({ verified: true })
    return res.status(200).json(cuadros)

  } catch (error) {
    return res.status(400).json("No se encontró ningún cuadro")
  }
}



const postCuadro = async (req, res, next) => {
  try {
    const newCuadro = new Cuadro(req.body)

    if (req.file) {
      newCuadro.imagen = req.file.path
    }

    if (req.user.rol === "admin") {
      newCuadro.verified = true
    } else {
      newCuadro.verified = false
    }

    const cuadroSaved = await newCuadro.save()
    return res.status(200).json(cuadroSaved)

  } catch (error) {
    return res.status(400).json("No se ha creado ningún cuadro")
  }
}



const putCuadro = async (req, res, next) => {
  try {
    const { id } = req.params
    const newCuadro = new Cuadro(req.body)
    newCuadro._id = id
    if (req.file) {
      newCuadro.imagen = req.file.path
      const oldCuadro = await Cuadro.findById(id)
      deleteFile(oldCuadro.imagen)
    }

    const cuadroUpdated = await Cuadro.findByIdAndUpdate(id, newCuadro, { new: true })
    return res.status(200).json(cuadroUpdated)

  } catch (error) {
    return res.status(400).json("No se actualizó ningún cuadro")
  }
}



const deleteCuadro = async (req, res, next) => {
  try {
    const { id } = req.params
    const cuadroDeleted = await Cuadro.findByIdAndDelete(id)
    deleteFile(cuadroDeleted.imagen)
    return res.status(200).json(cuadroDeleted)
  } catch (error) {
    return res.status(400).json("No se eliminó ningún cuadro")
  }
}



module.exports = { getCuadroById, getCuadroByCategory, getCuadroByPrice, getCuadros, postCuadro, putCuadro, deleteCuadro }