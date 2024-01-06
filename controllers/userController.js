import User from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

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
      console.log("UserID:", userId); // Log the userId

      const comicId = req.body.comicId; // The comic's ID should be sent in the request body
      console.log("ComicID:", comicId); // Log the comicId

      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { favorites: { comicId: comicId } } }, // $addToSet prevents duplicate entries
          { new: true } // Returns the updated document
      );

      console.log("Updated User:", updatedUser); // Log the updated user object

      if (!updatedUser) {
          console.log("User not found for ID:", userId); // Log if user is not found
          return res.status(404).send('User not found');
      }

      res.json(updatedUser.favorites);
  } catch (error) {
      console.error("Error in addFavoriteComic:", error); // Log any error
      res.status(500).json({ message: error.message });
  }
}

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

async function getFavorites(req, res) {
   try {
        const userId = req.user.userId; 
        const user = await User.findById(userId).populate('favorites.comicId');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const favoriteComics = user.favorites.map(f => f.comicId);
        res.json(favoriteComics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

 async function deleteFavorite(req, res){
    // try {
    //     const userId = req.user.userId; // Set by authenticateToken
    //     const comicId = req.params.comicId;
    //     console.log(userId, comicId)

    //     // Assuming 'favorites' is an array of comic IDs in your User model
    //     const response = await User.updateOne({ _id: userId }, { $pull: { favorites: comicId  } });
    //   console.log(response)
    //     res.json({ message: 'Favorite removed' });
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }

    try {
        const userId = req.user.userId; // Set by authenticateToken
        const comicId = req.params.comicId;

        // Modify the $pull to match the structure of items in the favorites array
        const response = await User.updateOne(
            { _id: userId },
            { $pull: { favorites: { comicId: comicId } } } // Match the structure of the object in the array
        );
        console.log(response);

        if (response.modifiedCount === 0) {
            return res.status(404).json({ message: 'Favorite not found or already removed' });
        }

        res.json({ message: 'Favorite removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
};



async function logoutUser(req, res) {
    res.clearCookie("token").json({ response: "You are Logged Out" })
}




export default {  registerUser, loginUser, logoutUser, getFavorites, addFavoriteComic, deleteFavorite }