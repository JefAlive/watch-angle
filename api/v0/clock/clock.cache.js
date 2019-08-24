var mcache = require('memory-cache');

function cache(duration) {
    return (req, res, next) => {
        var hour = req.params.hour;
        var minute = req.params.minute || 0;
        var key = 'clock_' + hour + '_' + minute;
        
        var cachedBody = mcache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponseBackup = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration);
                res.sendResponseBackup(body);
            }

            next();
        }
    };
}

module.exports = cache;