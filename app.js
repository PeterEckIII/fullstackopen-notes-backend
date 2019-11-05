const config = require('./utils/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info(`Connecting to ${ config.MONGO_URI }`);

mongoose
    .connect(config.MONGO_URI, { useNewUrlParser: true })
    .then(() => logger.info(`Connected to MongoDB`))
    .catch(e => logger.error(`Error connecting to MongoDB: ${ error.message }`))


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(middleware.requestLogger);
app.use('./api/notes', notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
