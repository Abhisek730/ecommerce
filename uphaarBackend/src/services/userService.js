const User = require("../models/user.js")
const bcrypt = require('bcrypt');
const { generateToken, getUserFromToken } = require("../config/jwtProvider.js")



class UserService {
    createUser = async (userData) => {
        try {
            let { firstName, lastName, email, password } = userData
            const isUserExist = await User.findOne({ email })

            if (isUserExist) {
                throw new Error("User already exist with email:", email)
            }

            let hashedPassword = await bcrypt.hash(password, 8)

            const user = await User.create({ firstName, lastName, email, password:hashedPassword })

            console.log("Created User:" + user);
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // Retrieve user by ID
    getUserById = async (userId) => {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw new Error('Could not retrieve user: ' + error.message);
        }
    }

    // Retrieve user by Email
    async findUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error('Could not retrieve user: ' + error.message);
        }
    }

    getUserProfileByToken = async (token) => {
        try {
            const userId = getUserFromToken(token)
            const user = await this.getUserById(userId)
            if (!user) {
                throw new Error("user not found with id:", userId)
            }
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getAllUsers = async () => {
        try {
            const users = await User.find()
            return users
        } catch (error) {
            throw new Error(error.message)
        }
    }

}


module.exports = UserService