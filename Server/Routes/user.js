const express = require("express")
const {registerUser,loginUser,loggedUserController,changeUserPassword,deleteUser } = require("../Controllers/user")
const { checkUserAuth} = require("../Middlewares/auth")
const rateLimit = require("express-rate-limit")

const router = express.Router()

const limit = rateLimit({
    windowMs : 1000 * 60 * 5,
    max : 10,
    message : "Too many requests, Please try after some time"
  })

router.post("/register-user",limit,registerUser)
router.post("/login-user",limit,loginUser)

router.get("/logged-user", checkUserAuth, loggedUserController);
router.put("/change-password", checkUserAuth,changeUserPassword)
router.delete("/delete-user",checkUserAuth,deleteUser)

module.exports = router