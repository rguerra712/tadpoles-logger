(function (){
    'use strict';
    
    let eventLogger = require('./lib/eventlogger');
    let logBuilder = require('./lib/logbuilder');
    let config = require('./config/config.js');
    var dash_button = require('node-dash-button');

    let dashMac = config.dashSettings.dashMacAddress;
    let dash = dash_button(dashMac, null, null, 'all');

    dash.on("detected", function (){
        console.log("Log added to tadpoles");
        eventLogger.log(logBuilder.buildSleepLog());
        eventLogger.log(logBuilder.buildBathroomLog());
        eventLogger.log(logBuilder.buildFoodLog());
    });
}());
