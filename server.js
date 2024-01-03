import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import comicBook from "./routes/comicBook.js";
import users from "./routes/users.js"
import registerMiddleware from "./utils/middleware.js";
// import getComics from "./api/getComics.js";



dotenv.config()
const app = express()
registerMiddleware(app)

app.use(express.json())

app.use('/api/comics', comicBook)
app.use('/auth', users)


mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(" Unable to connect to Database"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
