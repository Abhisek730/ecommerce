const UserService = require("../services/userService.js");
const userService = new UserService();

class UserController {
  async getUserProfile(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Token not found" });
      }
      
      const user = await userService.getUserProfileByToken(token);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
