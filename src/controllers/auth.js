// This file handles all your authentication needs
require("dotenv").config();
const tokenUtil = require("../util/token");
const logger = require("../services/logger");
const { log } = require("winston");

exports.login = function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        logger.error("Username and password are required");
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (username !== 'root' || password !== process.env.ROOT_PASSWORD) {
        logger.error("Invalid credentials");
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If all goes well, generate a JWT token and send it back
    token = tokenUtil.newtoken({
        username: username,
        role: 'admin'
    });
    res.json({ token });
}