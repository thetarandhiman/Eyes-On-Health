const mongoose = require("mongoose");

// Define the user schema
const UserSchema = new mongoose.Schema({
    User_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    Device_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    CCTV_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    User_Name: {
        type: String,
        required: true,
    },
    User_Age: {
        type: Number,
        required: true,
    },
    User_Password: {
        type: String,
        required: true,
    },
    User_Email: {
        type: String,
        required: true,
        unique: true,
    },
    User_Contact_No: {
        type: Number,
        required: true,
        unique: true,
    },
    User_Image_URL: {
        type: String,
        required: true,
    },
});

// Export the User model
const User = mongoose.model("User", UserSchema);
module.exports = User;