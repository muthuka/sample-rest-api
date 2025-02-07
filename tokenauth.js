const jwt = require("jsonwebtoken");
const logger = require("./src/services/logger");

exports.authenticateToken = function (req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            logger.error(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
