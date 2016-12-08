(function(){
    
    const commandLineArgs = require('command-line-args');
    const AWS = require('aws-sdk');
    const optionDefinitions = [
        { name: 'awsUserId', alias: 'a', type: String },
        { name: 'awsRegion', alias: 'r', type: String },
        { name: 'awsQueueName', alias: 'q', type: String },
        { name: 'username', alias: 'u', type: String },
        { name: 'password', alias: 'p', type: String },
        { name: 'mac', alias: 'm', type: String },
        { name: 'onetime', alias: 'o', type: Boolean }
    ];
    const options = commandLineArgs(optionDefinitions);

    let settings = {};

    settings.username = options.username;
    settings.password = options.password;
    settings.dashMacAddress = options.mac;
    
    if (!settings.username && process.env.BRIGHT_HORIZONS_USERNAME){
        settings.username = process.env.BRIGHT_HORIZONS_USERNAME; 
    }
    if (!settings.password && process.env.BRIGHT_HORIZONS_PASSWORD){
        settings.password = process.env.BRIGHT_HORIZONS_PASSWORD; 
    }
    if (!settings.dashMacAddress && process.env.TADPOLES_DASH_MAC_ADDRESS){
        settings.dashMacAddress = process.env.TADPOLES_DASH_MAC_ADDRESS; 
    }

    if (!settings.awsUserId && process.env.AWS_USER_ID){
        settings.awsUserId = process.env.AWS_USER_ID; 
    }

    if (!settings.awsRegion && process.env.AWS_REGION){
        settings.awsRegion = process.env.AWS_REGION; 
    }

    if (!settings.awsQueueName && process.env.AWS_MAKER_SQS_QUEUE_NAME){
        settings.awsQueueName = process.env.AWS_MAKER_SQS_QUEUE_NAME; 
    }

    if (!settings.oneTime && process.env.TADPOLES_ONE_TIME_SETTING){
        settings.oneTime = process.env.TADPOLES_ONE_TIME_SETTING; 
    }

    let awsConfig = new AWS.Config();
    awsConfig.update({region: settings.awsRegion});
    
    exports.awsSettings = {
        awsUserId: settings.awsUserId,
        awsRegion: settings.awsRegion,
        awsQueueName: settings.awsQueueName
    };

    exports.userSettings = {
        username: settings.username,
        password: settings.password
    };

    exports.dashSettings = {
        dashMacAddress: settings.dashMacAddress
    };

    exports.generalSettings = {
        oneTime: settings.oneTime
    };
})();