const jwt = require('jsonwebtoken');
const errorUtil = require('./error');

//66378ea0f03eb965824e1fa6
module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.cookies.access_token;
        if(!token) {
            return next(errorUtil.createError(401, "Not authenticated"));
        }
        jwt.verify(token, process.env.JWT_STRING, (err, user) => {
            if (err) {
                return next(errorUtil.createError(403, "Token is not valid"));
            }
            req.user = user;
            next();
        })
    },
    verifyUser: (req, res, next) => {
        module.exports.verifyToken(req, res, next, () => {
            if(req.user.is === req.params.id || req.user.isAdmin) {
                next();
            }
            else {
                next(errorUtil.createError(403, "Not authorized"));
            }
        })
    },
    verifyAdmin : (req, res, next) => {
        module.exports.verifyToken(req, res, next, () => {
            if(req.user.is === req.params.id || !req.user.isAdmin) {
                next();
            }
            else {
                next(errorUtil.createError(403, "Not authorized"));
            }
        }) 
    }
}