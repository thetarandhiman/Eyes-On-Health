const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// user register route
router.post("/register", userController.user_register);

// user login route
router.post("/login", userController.login);

// user profile route
router.get("/profile", userController.user_profile);

module.exports = router;