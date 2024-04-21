const { getUsers, registrer, login } = require("../controllers/userController.js")
const userRouter = require("express").Router()
const { isAdmin } = require("../../middleware/auth.js")
const upload = require("../../middleware/file.js")


userRouter.get("/", [isAdmin], getUsers)
userRouter.post("/registrer", upload.single("imagen"), registrer)
userRouter.post("/login", login)




module.exports = userRouter
