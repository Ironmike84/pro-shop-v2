import jwt from 'jsonwebtoken';
import asyncHandler from '../Middleware/asyncHandler.js';
import users from '../Models/UserModel.js';

//@Desc   - Auth user & get token
//@Route  - POST /api/users/login
//@access - Public
const authUser = asyncHandler(async (req, res ) => {
    const { email, password } = req.body;
    const user = await users.findOne({email})

    if(user && await user.matchPassword(password)){
        const token = jwt.sign({ userId: user._id},
            process.env.JWT_SECRET, {expiresIn: '30d'});

        // Set JWT as HTTP-Only Cookie

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
        } )

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

//@Desc   - Register User
//@Route  - POST /api/users
//@access - Public
const registerUser = asyncHandler(async (req, res ) => {
    res.send('Register User')
})

//@Desc   - Logout User & Clear Cookie
//@Route  - POST /api/users/logout
//@access - Private
const logoutUser = asyncHandler(async (req, res ) => {
    res.send('Logout User')
})

//@Desc   - Get User Profile
//@Route  - GET /api/users/profile
//@access - Private
const getUserProfile = asyncHandler(async (req, res ) => {
    res.send('Get User Profile')
})

//@Desc   - Update User Profile
//@Route  - PUT /api/users/profile
//@access - Private
const updateUserProfile = asyncHandler(async (req, res ) => {
    res.send('Update User Profile')
})

//@Desc   - Get Users
//@Route  - GET /api/users/
//@access - Private/Admin
const getUserById = asyncHandler(async (req, res ) => {
    res.send('Get User by Id')
})

//@Desc   - Get User by Id
//@Route  - GET /api/users/:id
//@access - Private/Admin
const getUsers = asyncHandler(async (req, res ) => {
    res.send('Get Users')
})

//@Desc   - Update User
//@Route  - PUT /api/users/:id
//@access - Private/Admin
const updateUser = asyncHandler(async (req, res ) => {
    res.send('Update User')
})

//@Desc   - Delete Users
//@Route  - DELETE /api/users/:id
//@access - Private/Admin
const deleteUser = asyncHandler(async (req, res ) => {
    res.send('Delete User Profile')
})

export {
    authUser,
    deleteUser,
    getUserById,
    getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile
};

