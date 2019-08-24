var mcache = require('memory-cache');

function cache(duration) {
    return (req, res, next) => {
        var hour = req.params.hour;
        var minute = req.params.minute || 0;
        var key = 'clock_' + hour + '_' + minute;
        
        var cachedBody = mcache.get(key);
        if (cachedBody) {
            console.log(cachedBody);
            console.log('Responded with cached response');

            res.send(cachedBody);
            
            return;
        } else {
            res.sendResponseBackup = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration);
                console.log(body);
                console.log('Responded without cached response');

                res.sendResponseBackup(body);
            }

            next();
        }
    };
}

module.exports = cache;