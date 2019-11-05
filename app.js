const config = require('./utils/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

console.log(`Connecting to ${ config.MONGO_URI }`);

mongoose
    .connect(config.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log(`Connected to MongoDB`))
    .catch(e => console.warn(`Error connecting to MongoDB: ${ error.message }`))


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(middleware.requestLogger);
app.use('./api/notes', notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
