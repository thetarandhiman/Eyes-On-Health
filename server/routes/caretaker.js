const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// caretaker register route
router.post("/register", userController.caretaker_register);

// caretaker login route
router.post("/login", userController.login);

// caretaker profile route
router.get("/profile", userController.caretaker_profile);

module.exports = router;