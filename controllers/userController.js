import User from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function registerUser(req, res) {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({ email: req.body.email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User Registered!!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function loginUser(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send('Could not find user with this address')
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(401).send('Wrong Password')
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token: token, userId: user._id })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function addFavoriteComic(req, res) {
    try {
        const userId = req.user.userId; // Assuming userId is stored in req.user by your authentication middleware
        const comicId = req.body.comicId; // The comic's ID should be sent in the request body
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: { comicId: comicId } } }, // $addToSet prevents duplicate entries
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.json(updatedUser.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token").json({ response: "You are Logged Out" })
}

export default {  registerUser, loginUser, logoutUser }