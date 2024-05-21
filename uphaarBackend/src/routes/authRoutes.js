const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');
const authController = new AuthController()

// Route for user registration (Sign Up)
router.post('/signup', authController.register);

// Route for user login (Sign In)
router.post('/signin', authController.login);

module.exports = router;
