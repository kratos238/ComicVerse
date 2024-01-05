import mongoose from 'mongoose'
const { Schema } = mongoose
const favoriteComicsSchema = new Schema({
    comicId: {
        type: Schema.Types.ObjectId,
        ref: 'ComicBook'
    }
})

const userSchema = new mongoose.Schema ({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // unique: true
    },
    favorites: [favoriteComicsSchema]

})

const User = mongoose.model('User', userSchema)
export default User