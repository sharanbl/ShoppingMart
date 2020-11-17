import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next) => {

        let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(' ')[1];    // Split after space (Bearer) and Bearer will be in 0th index and toekn in 1st index

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();

        } catch(error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not Authorized, no token');
    }


})

export { 
    protect
}