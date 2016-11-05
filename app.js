(function (){
    'use strict';
    
    let moment = require('moment');
    let eventLogger = require('./lib/eventlogger');
    let logBuilder = require('./lib/logbuilder');
    let config = require('./config/config.js');
    var dash_button = require('node-dash-button');

    let dashMac = config.dashSettings.dashMacAddress;
    let dash = dash_button(dashMac, null, null, 'all');
    let lastEntryTime;

    dash.on("detected", function (){
        let secondsDiff = moment().diff(lastEntryTime, 'seconds')
        if (lastEntryTime && secondsDiff < 60)
        {
            console.log("Log key already pressed, still waiting");
            return;
        }
        console.log("Log added to tadpoles");
        let logs = [
            logBuilder.buildSleepLog(),
            logBuilder.buildBathroomLog(),
            logBuilder.buildFoodLog()
        ];
        eventLogger.logEvents(logs);
        lastEntryTime = moment();
    });
}());
