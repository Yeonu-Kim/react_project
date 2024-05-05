const User = require("../models/User");

module.exports = {
    createUser: async (req, res, next) => {
        const newUser = new User(req.body);
        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }
        catch(err) {
            next(err);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const userID = req.params.id;
            const updatedUser = await User.findByIdAndUpdate(userID, {$set: req.body}, {new: true});
            res.status(200).json(updatedUser);
        }
        catch(err) {
            next(err);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const userID = req.params.id;
            await User.findByIdAndDelete(userID);
            res.status(200).json({success: true});
        }
        catch(err) {
            next(err);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const UserID = req.params.id;
            const user = await User.findById(userID);
            res.status(200).json(user);
        }
        catch(err) {
            next(err);
        }
    },
    getAllUser: async (req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        }
        catch(err) {
            next(err);
        }
    }
};