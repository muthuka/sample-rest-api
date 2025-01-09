// This is the logger using winston
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' })
    ]
});

if (process.env.INSTANCE !== 'production') {
    logger
        .add(new winston.transports.Console({
            format: winston.format.simple()
        }));
}

module.exports = logger;
