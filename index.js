// express
var express = require('express');
var app = express();
var router = express.Router();

// routes
var clockRoutes = require('./api/v0/clock/clock.routes.js');

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

app.use('/v1/rest', router);

clockRoutes(router);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});