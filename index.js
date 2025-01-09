const express = require('express');
const logger = require('./src/services/logger');

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Add Routes
const routes = require("./routes");
routes.addRoutes(app);

// Start server
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});