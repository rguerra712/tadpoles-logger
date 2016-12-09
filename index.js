(function(){
    'use strict';

    let exports = module.exports = {}; 

    const logBuilder = require('./lib/logbuilder');
    const babyLogger = require('./lib/baby-logger.js');
    
    exports.logBuilder = logBuilder;
    exports.babyLogger = babyLogger;
})();