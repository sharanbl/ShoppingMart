import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import generateToken from '../utils/generateTokens.js';
import genrateToken from '../utils/generateTokens.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private 
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

// @desc Register a new user
// @route POST /api/users
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error('User already Exists!');
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        // Status code 201 is to indicate that something was created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invlaid user data');
    }
})


export {
    authUser,
    getUserProfile,
    registerUser,
}