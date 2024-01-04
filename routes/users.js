import express from "express"
const router = express.Router()
import userController from '../controllers/userController.js'

router.get("/logout", userController.logoutUser)

router.post("/signup", userController.registerUser)

router.post("/login", userController.loginUser)


export default router