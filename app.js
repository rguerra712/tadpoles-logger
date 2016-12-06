(function (){
    'use strict';
    
    const moment = require('moment');
    const config = require('./config/config.js');
    const babyLogger = require('./lib/baby-logger.js');
    const dash_button = require('node-dash-button');
    const sqs = require('./apis/sqs/client.js');

    let dashMac = config.dashSettings.dashMacAddress;
    if (dashMac){
        let dash = dash_button(dashMac, null, null, 'all');
        let lastEntryTime;

        dash.on("detected", function (){
            babyLogger.log();
        });
    }
    let awsQueue = config.awsSettings.awsQueueName;
    if (awsQueue){
        sqs.watchForCommand(data => {
            if (data.command && data.command.toLowerCase() === 'daycare'){
                babyLogger.log();
            }
        });
    }


}());
