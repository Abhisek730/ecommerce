const UserService = require("../services/userService.js")
const { generateToken, getUserFromToken } = require("../config/jwtProvider.js")
const CartService = require('../services/cartService.js')
const bcrypt = require('bcrypt');


const userService = new UserService()

class AuthController {
    register = async (req, res) => {
        try {
            const user = await userService.createUser(req.body)
            const jwt = generateToken(user._id)
            await CartService.createCart(user)
            return res.status(200).send({ jwt, message: "Registered Successfully" })
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }

    login = async (req, res) => {
        const { password, email } = req.body;
        try {
            let user = await userService.findUserByEmail(email)
            console.log(user);
            if (!user) {
                return res.status(401).json("User not found with email:" + email);
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json('Invalid password')
            }
            const jwt = generateToken(user._id)
            return res.status(200).send({ jwt, message: "Login Successful" })
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }

}




module.exports =AuthController