var clockController = require('./clock.controller.js');
var clockCache = require('./clock.cache.js')

module.exports = function(router) {
    router.get('/clock/:hour/:minute', clockCache(10000), clockController.getAngle);
    router.get('/clock/:hour', clockCache(10000), clockController.getAngle);
}