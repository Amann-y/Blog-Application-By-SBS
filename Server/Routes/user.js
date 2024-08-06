const express = require("express")
const {registerUser,loginUser} = require("../Controllers/user")
const rateLimit = require("express-rate-limit")

const router = express.Router()

const limit = rateLimit({
    windowMs : 1000 * 60 * 5,
    max : 10,
    message : "Too many requests, Please try after some time"
  })

router.post("/register-user",registerUser)
router.post("/login-user",limit,loginUser)

module.exports = router