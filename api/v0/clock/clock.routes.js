var { param } = require('express-validator');
var clockController = require('./clock.controller.js');
var clockCache = require('./clock.cache.js')

module.exports = function(router) {
    router.get('/clock/:hour/:minute', [
        param('hour', 'Hour must be an integer between 0 and 12').isInt({min: 0, max: 12}),
        param('minute', 'Minute must be an integer between 0 and 59').isInt({min: 0, max: 59})
    ], clockCache(10000), clockController.getAngle);

    router.get('/clock/:hour', [
        param('hour', 'Hour must be an integer between 0 and 12').isInt({min: 0, max: 12})
    ], clockCache(10000), clockController.getAngle);
}