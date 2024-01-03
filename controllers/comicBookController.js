import ComicBook from "../models/comicBook.js";

async function getAllComicBooks(req, res) {
    console.log(req, res)
    try {
        const comicBooks = await ComicBook.find({})
        res.json(comicBooks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getComicBookById(req, res) {
    try {
        const comicBook = await ComicBook.findById(req.params.id)
        if (comicBook) {
            res.json(comicBook)
        } else {
            res.status(404).json({ message: ' Comcic Not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function createComicBook(req, res) {
    try{
        const newComicBook = new ComicBook(req.body)
        const savedComicBook = await newComicBook.save()
        res.status(201).json(savedComicBook)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

async function updateComicBook(req, res) {
    try {
        const updatedComicBook = await ComicBook.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(updateComicBook) {
            res.json(updateComicBook)
        } else {
            res.status(404).json({message: 'Comic Not Found'})
        }
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

async function deleteComicBook(req, res) {
    try {
        const comicBook = await ComicBook.findByIdAndDelete(req.params.id);
        if(comicBook) {
            res.json({ message: 'Comic Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Comic Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { getAllComicBooks, getComicBookById, createComicBook, updateComicBook, deleteComicBook}