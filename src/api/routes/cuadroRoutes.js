const { getCuadroById, getCuadroByCategory, getCuadroByPrice, getCuadros, postCuadro, putCuadro, deleteCuadro } = require("../controllers/cuadroController.js")
const cuadrosRouter = require("express").Router()
const { isAuth, isAdmin } = require("../../middleware/auth.js")
const upload = require("../../middleware/file.js")


cuadrosRouter.get("/precio/:price", getCuadroByPrice)
cuadrosRouter.get("/categoria/:categoria", getCuadroByCategory)
cuadrosRouter.get("/:id", getCuadroById)
cuadrosRouter.get("/", getCuadros)
cuadrosRouter.post("/", [isAuth], upload.single("imagen"), postCuadro)
cuadrosRouter.put("/:id", [isAdmin], upload.single("imagen"), putCuadro)
cuadrosRouter.delete("/:id", [isAdmin], deleteCuadro)

module.exports = cuadrosRouter