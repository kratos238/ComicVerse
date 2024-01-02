import mongoose from 'mongoose'

const favoirtueComicsSchema = new Schema({
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
        unique: true
    },
    favoirites: [favoirtueComicsSchema]

})

const User = mongoose.model('User', userSchema)
export default User