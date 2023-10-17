const mongoose = require("mongoose");
const User = require("../models/user");

// user register route
exports.user_register = (req, res, next) => {
    // User Register Logic
    res.send("REGISTER");
    console.log(req.body);
    let newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        User_Name: req.body.User_Name,
        User_Age: req.body.User_Age,
        User_Password: req.body.User_Password,
        User_Email: req.body.User_Email,
        User_Contact_No: req.body.User_Contact_No,
        User_Image_URL: req.body.User_Image_URL,
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
        res.json({ success: false, msg: "Failed to register user" });
        } else {
        res.json({ success: true, msg: "User registered" });
        }
    });
}

// user login route
exports.login = (req, res, next) => {
    // User Login Logic
    res.send("LOGIN");
    const User_Email = req.body.User_Email;
    const User_Password = req.body.User_Password;
    User.getUserByEmail(User_Email, (err, user) => {
        if (err) throw err;
        if (!user) {
        return res.json({ success: false, msg: "User not found" });
        }
        User.comparePassword(User_Password, user.User_Password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800, // 1 week
            });
            res.json({
            success: true,
            token: "JWT " + token,
            user: {
                id: user._id,
                User_Name: user.User_Name,
                User_Email: user.User_Email,
                User_Contact_No: user.User_Contact_No,
                User_Image_URL: user.User_Image_URL,
            },
            });
        } else {
            return res.json({ success: false, msg: "Wrong password" });
        }
        });
    });
}

// user profile route
exports.user_profile = (req, res, next) => {
    // User Profile Logic
    res.send("PROFILE");
    res.json({ user: req.user });   
}