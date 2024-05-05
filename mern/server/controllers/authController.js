const User = require("../models/User");
const bcrypt = require('bcrypt');

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

    }
}