import User from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import applicationContext from '../utils/middleware.js'

async function registerUser(req, res) {
    console.log(req, res)
  try {
    // grab model from context
    const User = req.context.models.User
    console.log(User)
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10)
    console.log(req.body.password)
    // create new User
    const user = await User.create(req.body)
    console.log(user)
    // respond, send back user without password
    const response = { username: user.username, favorites: user.favorites }
    res.json(response)
  } catch (error) {
    res.status(400).json({ error: error.message})
  }
}

// login route "/auth/login"
async function loginUser(req, res) {
  try {
    console.count("login")
    // grab model from context
    const User = req.context.models.User
    console.count("login")
    // grab username and password
    const { username, password } = req.body
    // see if user exists
    const user = await User.findOne({ username })
    if (user) {
      // check if password matches
      const doesItMatch = await bcrypt.compare(password, user.password)
      if (doesItMatch) {
        // remove password from user data
        const userData = { username: user.username, role: user.role }
        // sign token
        const token = jwt.sign(userData, process.env.SECRET)
        // respond
        res.cookie("token", token, { httpOnly: true }).json(userData)
      } else {
        throw "Passwords do not match"
      }
    } else {
      throw "User Does Not Exist"
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}

// logout "/auth/logout"
function logoutUser(req, res) {
  res.clearCookie("token").json({ response: "You are Logged Out" })
}



// async function registerUser(req, res) {
//     try {
//         const existingUser = await User.findOne({ email: req.body.email })
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already in use' })
//         }

//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         const newUser = new User({ email: req.body.email, password: hashedPassword })
//         await newUser.save()
//         res.status(201).json({ message: 'User Registered!!' })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

// async function loginUser(req, res) {
//     try {
//         const user = await User.findOne({ email: req.body.email })
//         if (!user) {
//             return res.status(400).send('Could not find user with this address')
//         }
//         const validPassword = await bcrypt.compare(req.body.password, user.password)
//         if (!validPassword) {
//             return res.status(401).send('Wrong Password')
//         }
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
//         res.json({ token: token, userId: user._id })
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }


// async function addFavoriteComic(req, res) {
//     try {
//         const userId = req.user.userId; // Assuming userId is stored in req.user by your authentication middleware
//         const comicId = req.body.comicId; // The comic's ID should be sent in the request body
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { $addToSet: { favorites: { comicId: comicId } } }, // $addToSet prevents duplicate entries
//             { new: true } // Returns the updated document
//         );

//         if (!updatedUser) {
//             return res.status(404).send('User not found');
//         }

//         res.json(updatedUser.favorites);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// async function logoutUser(req, res) {
//     res.clearCookie("token").json({ response: "You are Logged Out" })
// }

export default {  registerUser, loginUser, logoutUser }