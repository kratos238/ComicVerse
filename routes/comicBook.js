const express = require("express")
const router = express.Router()
const comicBookController = require("../controllers/comicBookController")

router.get("/", comicBookController.getAllComicBooks)

router.get("/id", comicBookController.getComicBookById)

router.post("/", comicBookController.createComicBook)

router.put("/:id", comicBookController.updateComicBook)

router.delete("/:id", comicBookController.deleteComicBook)

module.exports = router