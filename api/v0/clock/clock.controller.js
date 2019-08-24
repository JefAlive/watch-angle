var Big = require('big.js')
var cache = require('memory-cache');

function getAngle(req, res, next) {
    var hour = req.params.hour;
    var minute = req.params.minute || 0;

    var angle;

    var key = 'clock_' + hour + '_' + minute;
    var cachedAngle = cache.get(key);
    if (cachedAngle) {
        angle = cachedAngle;
        console.log('Responded angle ' + angle + ' [cashed in memory]');
    } else {
        angle = calculateAngle(hour, minute);
        cache.put(key, angle, 10000);
        console.log('Responded angle ' + angle + ' [calculated]');
    }

    res.json({
        angle : angle
    });
}

function calculateAngle(hour, minute) {
    var hourInAngle = new Big(hour).times(30);
    var minuteInAngle = new Big(minute).times(6);
    var angleDiff = hourInAngle.minus(minuteInAngle).abs();

    if (angleDiff.gt(180)) {
        return new Big(360).minus(angleDiff);
    }
    return angleDiff;
}

module.exports = {
    getAngle : getAngle
}