(function (){
    'use strict';
    
    const config = require('./config/config.js');
    const babyLogger = require('./lib/baby-logger.js');
    const logBuilder = require('./lib/logbuilder');
    const dash_button = require('node-dash-button');
    const sqs = require('./apis/sqs/client.js');

    let dashMac = config.dashSettings.dashMacAddress;
    let logs = [
            logBuilder.buildSleepLog(),
            logBuilder.buildBathroomLog(),
            logBuilder.buildFoodLog()
        ];

    if (dashMac){
        let dash = dash_button(dashMac, null, null, 'all');

        dash.on("detected", function (){
            babyLogger.log(logs);
        });
    }

    let awsQueue = config.awsSettings.awsQueueName;
    if (awsQueue){
        sqs.watchForCommand(data => {
            if (data.command && data.command.toLowerCase() === 'daycare'){
               babyLogger.log(logs);
            }
        });
    }

    if (config.generalSettings.oneTime){
        babyLogger.log(logs);
    }

}());
