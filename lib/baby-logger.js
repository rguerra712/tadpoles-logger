(function(){
    'use strict';
    
    let exports = module.exports = {};

    const moment = require('moment');
    let eventLogger = require('./eventlogger');
    let logBuilder = require('./logbuilder');
    let lastEntryTime;

    exports.log = (logs) => {
        let secondsDiff = moment().diff(lastEntryTime, 'seconds');
        if (lastEntryTime && secondsDiff < 60)
        {
            console.log("Log already recently added, still waiting");
            return;
        }
        console.log("Log added to tadpoles");
        eventLogger.logEvents(logs);
        lastEntryTime = moment();
    };

})();