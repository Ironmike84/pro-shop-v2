import asyncHandler from '../Middleware/asyncHandler.js';
import User from '../Models/UserModel.js';
import generateToken from '../Utilities/generateToken.js';

//@Desc   - Auth user & get token
//@Route  - POST /api/users/login
//@access - Public
const authUser = asyncHandler(async (req, res ) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){
        generateToken(res, user._id)
        res.status(200).json({
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
    const { name, email, password } = req.body
    
    const userExists = await User.findOne({email});
    if (userExists){
        res.status(400);
        throw new Error('User Already Exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data...')
        
    }
})

//@Desc   - Logout User & Clear Cookie
//@Route  - POST /api/users/logout
//@access - Private
const logoutUser = asyncHandler(async (req, res ) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "Logged Out Successfully!!"})
})

//@Desc   - Get User Profile
//@Route  - GET /api/users/profile
//@access - Private
const getUserProfile = asyncHandler(async (req, res ) => {
    const user = await User.findById(req.user._id);
    if (user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('User Not Found!!')
    }
    res.send('Get User Profile')
})

//@Desc   - Update User Profile
//@Route  - PUT /api/users/profile
//@access - Private
const updateUserProfile = asyncHandler(async (req, res ) => {
const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email;

        if (req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        res.status(404);
        throw new Error('User Not Found')
    }
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

