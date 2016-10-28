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
    
    exports.log = log => {
    
        let validateAndLog = token => 
            tadpolesClient.validateToken(token)
            .then(cookie => 
                tadpolesClient.validateLogin(cookie)
                .then(cookie => 
                    tadpolesClient.getChildDetails(cookie)
                    .then(details => {
                        logBuilder.setDetailsFor(log, details);
                        tadpolesClient.logReport(cookie, details, log);
                    })
                    .catch(logError))
                .catch(logError))
            .catch(logError); 
        loginClient.login(username, password)
            .then(validateAndLog)
            .catch(logError);
    };
}());