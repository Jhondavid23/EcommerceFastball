
const express = require('express');
const UserService = require('./../services/userService');

const router = express.Router();
const service = new UserService();


router.get('/', async (req,res,next)=>{
    try {
        const users = await service.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error.message)
    }
})





module.exports = {
    getAllUsers,
    createUser,
}