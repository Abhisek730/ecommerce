const express = require('express');
const router = express.Router();

const UserController = require("../controller/userController.js")
const userController = new UserController();

router.get("/profile", userController.getUserProfile)
router.get("/", userController.getAllUsers)

module.exports = router