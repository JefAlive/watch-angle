var express = require('express');
var app = express();
var Big = require('big.js')

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.get('/v1/rest/clock/:hour/:minute', (req, res, next) => {
    var hour = req.params.hour;
    var minute = req.params.minute;

    var hourInAngle = new Big(hour).times(30);
    var minuteInAngle = new Big(minute).times(6);

    var angleDiff = hourInAngle.minus(minuteInAngle).abs();
    if (angleDiff.gt(180)) {
        angleDiff = new Big(360).minus(angleDiff);
    }

    res.json({
        angle : angleDiff
    });
});