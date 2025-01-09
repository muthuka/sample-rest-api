const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate a new token
exports.newtoken = function (params) {
    const jwt = require("jsonwebtoken");
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    params = params;

    // Assign expiration for the token
    var tokenExpiration = 60 * 60; // 1 hour
    if (process.env.TOKEN_EXPIRATION_SECONDS !== undefined) {
        tokenExpiration = parseInt(process.env.TOKEN_EXPIRATION_SECONDS);
    }

    let data = Object.assign({}, params, {
        iss: "Muthu Arumugam",
        exp: Math.floor(Date.now() / 1000) + tokenExpiration,
    });

    const token = jwt.sign(data, jwtSecretKey);
    return token;
};

// Token Validation
exports.validate = function (token) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return true;
        } else {
            // Access Denied
            return false;
        }
    } catch (error) {
        // Access Denied
        return false;
    }
};
