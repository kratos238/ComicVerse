import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import comicBookRoutes from "./routes/comicBook.js";
import getComics from "./api/getComics.js";



dotenv.config()
const app = express()

app.use(express.json())

app.use('./api/getComics.js', comicBookRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(" Unable to connect to Database"))