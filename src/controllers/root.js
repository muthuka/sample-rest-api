require("dotenv").config();

exports.index = function (req, res) {
    res.status(200).json({
        version: require('../../package.json').version,
        instance: process.env.INSTANCE
    });
};
