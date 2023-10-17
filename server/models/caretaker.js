const mongoose = require("mongoose");

const CaretakerSchema = mongoose.Schema({
    Caretaker_ID: {
        type: Number,
        required: true,
    },
    User_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    Caretaker_Name: {
        type: String,
        required: true,
    },
    Caretaker_Email: {
        type: String,
        required: true,
        unique: true,
    },
    Caretaker_Password: {
        type: String,
        required: true,
    },
    Caretaker_Contact_No: {
        type: Number,
        required: true,
        unique: true,
    },
    Caretaker_Image_URL: {
        type: String,
        required: true,
    },
});

// Export the Caretaker model
const Caretaker = mongoose.model("Caretaker", CaretakerSchema);
module.exports = Caretaker;