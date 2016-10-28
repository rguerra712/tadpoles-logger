(function (){
    'use strict';
    
    let eventLogger = require('./lib/eventlogger');
    let logBuilder = require('./lib/logbuilder');
    
    eventLogger.log(logBuilder.buildSleepLog);
    eventLogger.log(logBuilder.buildBathroomLog);
    eventLogger.log(logBuilder.buildFoodLog);
    
}());
