const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const errorUtil = require("../utils/error");

const saltRounds = 10;

module.exports = {
    registerUser: async (req, res, next) => {
        try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            })

            await newUser.save();
            res.status(200).send(newUser);
        }
        catch(err) {
            next(err);
        }
    },
    loginUser: async (req, res, next) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) {
                return next(errorUtil.createError(404, "User not found"))
            }

            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) {
                return next(errorUtil.createError(400, "Wrong password or username"))
            }

            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_STRING);
            const { password, isAdmin, ...otherDetails} = user.toObject();
        
            res
            .cookie("access_token", token, {
                maxAge: 86400_000,
                httpOnly: true
            })
            .status(200)
            .json({...otherDetails})
        }
        catch (err) {
            next(err);
        }
    }
}