const { getMuseoById, getMuseos, postMuseo, putMuseo, deleteMuseo } = require("../controllers/museoController.js")
const museosRouter = require("express").Router()
const { isAdmin } = require("../../middleware/auth.js")
const upload = require("../../middleware/file.js")




museosRouter.get("/:id", getMuseoById)
museosRouter.get("/", getMuseos)
museosRouter.post("/", [isAdmin], upload.single("imagen"), postMuseo)
museosRouter.put("/:id", [isAdmin], upload.single("imagen"), putMuseo)
museosRouter.delete("/:id", [isAdmin], deleteMuseo)

module.exports = museosRouter