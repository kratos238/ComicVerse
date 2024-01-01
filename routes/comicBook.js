import express  from "express"
const router = express.Router()
import comicBookController from "../controllers/comicBookController.js"


router.get("/", comicBookController.getAllComicBooks)

router.get("/id", comicBookController.getComicBookById)

router.post("/", comicBookController.createComicBook)

router.put("/:id", comicBookController.updateComicBook)

router.delete("/:id", comicBookController.deleteComicBook)

export default router