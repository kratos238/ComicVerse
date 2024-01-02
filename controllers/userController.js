import User from '../models/users.js'
import bcrypt from 'bcrypt'
import { Jwt } from 'jsonwebtoken'

async function registerUser(req, res) {
    try {
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