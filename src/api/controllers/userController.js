const User = require("../models/User.js")
const { generateSing } = require("../../config/jwt.js")
const bcrypt = require("bcrypt")

const getUsers = async (req, res, next) => {
  try {
    const user = await User.find()
    return res.status(200).json(user)

  } catch (error) {
    console.log(error);
    return res.status(400).json("No se ha encontrado ningún usuario")
  }
}


const registrer = async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    newUser.rol = "user"

    if (req.file) {
      newUser.imagen = req.file.path
    }

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)

  } catch (error) {
    console.log(error);
    return res.status(401).json("No se ha podido registrar el usuario")
  }
}


const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ nombre: req.body.nombre })

    if (!user) {
      return res.status(400).json("No existe usuario")
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSing(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json("contraseña incorrecta")
    }


  } catch (error) {
    console.log(error);
    return res.status(400).json("No hemos podido hacer login")
  }
}



module.exports = { getUsers, registrer, login }