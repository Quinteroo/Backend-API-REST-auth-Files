require("dotenv").config()
const express = require('express')
const mongoose = require("mongoose")
const cloudinary = require("cloudinary").v2
const { connectDB } = require("./src/config/db.js")
const museosRouter = require("./src/api/routes/museoRoutes.js")
const cuadrosRouter = require("./src/api/routes/cuadroRoutes.js")
const userRouter = require("./src/api/routes/userRoutes.js")


const app = express()
app.use(express.json())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

connectDB()

app.use("/api/v1/museos", museosRouter)
app.use("/api/v1/cuadros", cuadrosRouter)
app.use("/api/v1/users", userRouter)

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found 🥵")
})

app.listen(4100, () => {
  console.log("Servidor levantado en puerto 4100 🐲");
})