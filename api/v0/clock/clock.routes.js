var Clock = require('./clock.controller.js');

module.exports = function(router) {
    router.get('/clock/:hour/:minute', Clock.getAngle)
}