(function (){
    'use strict';
    
    let loginClient = require('../apis/brighthorizons/client');
    let tadpolesClient = require('../apis/tadpoles/client');
    let logBuilder = require('../lib/logbuilder');
    let config = require('../config/config.js');
    
    let username = config.userSettings.username;
    let password = config.userSettings.password;

    if (!username || !password){
        console.error('Unable to get username or password from environment variables');
        return;
    }

    let logError = reason => {
        console.error(reason);
    };
    
    exports.logEvents = (logs) => {
        let validateAndLog = token => 
            tadpolesClient.validateToken(token)
            .then(cookie => 
                tadpolesClient.validateLogin(cookie)
                .then(cookie => 
                    tadpolesClient.getChildDetails(cookie)
                    .then(details => {
                        let logMessage = logBuilder.createLogsFor(details, logs);
                        tadpolesClient.logReport(cookie, details, logMessage);
                    })
                    .catch(logError))
                .catch(logError))
            .catch(logError); 
        loginClient.login(username, password)
            .then(validateAndLog)
            .catch(logError);
    };
}());