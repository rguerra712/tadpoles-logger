'use strict';

var babyLogger = require('./lib/baby-logger.js');
    
exports.handler = (event, context, callback) => {
    babyLogger.log();
    callback(null, 'Log created');
}