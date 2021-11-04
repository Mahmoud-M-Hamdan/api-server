'use strict';
require('dotenv').config();

// 1st level packages -> we did not install anything
// 3rd party packages
const express = require('express');
// local modules
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const { get } = require('./routes/customer');
const PORT = process.env.PORT || 8080;
const app = express();

const customerRouter = require('./routes/customer');
const foodRouter = require('./routes/food');

// Global Middlewares
app.use(express.json()); // access the body
// app.use(cors()); install the package
app.use(logger);

app.use(customerRouter);
app.use(foodRouter);

function start(port) {
    app.listen(port, ()=> console.log(`Running on Port ${port}`))
}

app.get('/',(req,res)=>{
    console.log("heey")
    res.send("Hey there")
})

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    app: app,
    start: start
}