const express = require('express')
const userRouter = express.Router()
const upload = require("../utils/multer")
const { loginUser, signupUser, logout, forgetPassword, resetPassword } = require('../controllers/authController')

userRouter.post('/login', loginUser)
userRouter.post('/signup',upload.single("file") , signupUser)
userRouter.get('/logout', logout)


userRouter.post('/forgetPassword', forgetPassword)
userRouter.post('/resetPassword', resetPassword)



module.exports = userRouter;