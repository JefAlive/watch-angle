// express
var express = require('express');
var app = express();
var router = express.Router();

var config = require('./config.js');

// routes
var clockRoutes = require('./api/v0/clock/clock.routes.js');

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

app.use('/v1/rest', router);

clockRoutes(router);

var port = config.port || 3000;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});