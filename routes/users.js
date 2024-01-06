import express from "express"
const router = express.Router()
import userController from '../controllers/userController.js'
import auth from '../utils/auth.js'

router.get("/logout", userController.logoutUser)

router.get("/favorites", auth.authenticateToken, userController.getFavorites)

router.put("/favorites", auth.authenticateToken, userController.addFavoriteComic)

router.post("/signup", userController.registerUser)

router.post("/login", userController.loginUser)

router.delete("/favorites/:comicId", auth.authenticateToken, userController.deleteFavorite)


export default router