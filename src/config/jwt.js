const jwt = require("jsonwebtoken")


const generateSing = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1y" })
}


const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}


module.exports = { generateSing, verifyJwt }