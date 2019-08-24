var Big = require('big.js')

function getAngle(req, res, next) {
    var hour = req.params.hour;
    var minute = req.params.minute;
    var angle = calculateAngle(hour, minute);
    
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