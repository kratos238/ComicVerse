require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const comicBookRoutes =  require("./routes/comicBook")

app.use(express.json())

app.use("")

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(" Unable to connect to Database"))