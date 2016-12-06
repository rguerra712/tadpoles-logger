(function (){
    'use strict';
    
    const moment = require('moment');
    const config = require('./config/config.js');
    const babyLogger = require('./lib/baby-logger.js');
    const dash_button = require('node-dash-button');

    let dashMac = config.dashSettings.dashMacAddress;
    if (dashMac){
        let dash = dash_button(dashMac, null, null, 'all');
        let lastEntryTime;

        dash.on("detected", function (){
            babyLogger.log();
        });
    }
    let awsQueue = config.awsSettings.awsQueue;
    if (awsQueue){
        sqs.watchForCommand(data => {
            if (data.command && data.command.toLowerCase() === 'daycare'){
                babyLogger.log();
            }
        });
    }


}());
