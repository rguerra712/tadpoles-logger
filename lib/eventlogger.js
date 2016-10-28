(function (){
    'use strict';
    
    let loginClient = require('../apis/brighthorizons/client');
    let tadpolesClient = require('../apis/tadpoles/client');
    let config = require('../config/config.js');
    
    let username = config.userSettings.username;
    let password = config.userSettings.password;

    let logError = reason => {
        console.error(reason);
    };
    
    exports.log = logBuilder => {
    
        let validateAndLog = token => 
            tadpolesClient.validateToken(token)
            .then(cookie => 
                tadpolesClient.validateLogin(cookie)
                .then(cookie => 
                    tadpolesClient.getChildDetails(cookie)
                    .then(details => {
                        tadpolesClient.logReport(cookie, details, logBuilder(details));
                    })
                    .catch(logError))
                .catch(logError))
            .catch(logError); 
        loginClient.login(username, password)
            .then(validateAndLog)
            .catch(logError);
    };
}());