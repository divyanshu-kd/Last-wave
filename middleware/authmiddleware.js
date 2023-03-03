const jwt = require("jsonwebtoken");
const users = require("../models/user");

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodeToken) => {
            if (err) {
                res.locals.user = null;
                next()
            }
            else {

                let User = await users.findOne({ _id: decodeToken.id });
                if (User) {
                    res.locals.user = User;
                }
                else{
                    res.locals.user = null;
                }
                next()
            }

        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                //   console.log(err.message);
                res.redirect('/login');
            } else {
                //   console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};


module.exports = {checkUser,checkAuth};