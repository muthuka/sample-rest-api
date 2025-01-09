// This file contains all the routes needed for the application
const root = require('./src/controllers/root')
const auth = require('./src/controllers/auth')
const users = require('./src/controllers/users')

const tokenValidation = require("./tokenauth").authenticateToken;

exports.addRoutes = function (app) {

    // Add root route
    app.get('/', root.index);

    // Add users route
    app.post('/login', auth.login);

    // Users resource routes
    app.post("/users", tokenValidation, users.create);
    app.get("/users", tokenValidation, users.getAll);
    app.get("/users/:id", tokenValidation, users.get);
    app.put("/users/:id", tokenValidation, users.update);
    app.delete("/users/:id", tokenValidation, users.remove);
}