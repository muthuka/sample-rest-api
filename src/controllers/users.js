// This file is focused on users: resource
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const users = {}; // This object will hold all the users

// This function creates a new user and adds it to the dictionary
// Throws error if the user exist already
exports.create = function (req, res) {
    const user = req.body;
    if (users[user.email]) {
        res.status(400).send("User already exists");
    } else {
        user.id = uuidv4();
        users[user.email] = user;
        res.status(201).send("User created");
    }
}

// This function returns all the users in the dictionary
exports.getAll = function (req, res) {
    res.status(200).send(users);
}

// This function returns a specific user
// Throws error if the user does not exist
exports.get = function (req, res) {
    const id = req.params.id;
    const user = Object.values(users).find(user => user.id === id);
    if (!user) {
        res.status(404).send("User not found");
    } else {
        res.status(200).send(user);
    }
}

// This function updates a specific user
// Throws error if the user does not exist
exports.update = function (req, res) {
    const id = req.params.id;
    const user = Object.values(users).find(user => user.id === id);
    if (!user) {
        res.status(404).send("User not found");
    } else {
        const updatedUser = req.body;
        updatedUser.id = user.id;
        users[user.email] = updatedUser;
        res.status(200).send("User updated");
    }
}

// This function removes a specific user
// Throws error if the user does not exist
exports.remove = function (req, res) {
    const id = req.params.id;
    const user = Object.values(users).find(user => user.id === id);
    if (!user) {
        res.status(404).send("User not found");
    } else {
        delete users[user.email];
        res.status(200).send("User removed");
    }
}
