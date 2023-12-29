import mongoose from "mongoose"

const comicBookSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    thumbnailUrl: String,
    issueNumber: Number,
    pageCount: Number,
    resourceURI: String,
})

const ComicBook = mongoose.model("ComicBook", comicBookSchema)

export default ComicBook