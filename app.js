(function (){
    'use strict';
    
    let loginClient = require('./apis/brighthorizons/client');
    let tadpolesClient = require('./apis/tadpoles/client');
    let logBuilder = require('./lib/logbuilder');
        
    let logError = reason => {
        console.error(reason);
    };
    let validateAndLog = token => 
        tadpolesClient.validateToken(token)
        .then(cookie => 
            tadpolesClient.validateLogin(cookie)
            .then(cookie => 
                tadpolesClient.getChildDetails(cookie)
                .then(details => {
                    let logs = [
                        logBuilder.buildSleepLog(details),
                        logBuilder.buildFoodLog(details),
                        logBuilder.buildBathroomLog(details)
                    ];
                    let promises = logs.map(log => {
                        tadpolesClient.logReport(cookie, details, log);
                    });
                    Promise.all(promises)
                        .then(val => {
                            console.info('success');
                        })
                        .catch(logError);
                })
                .catch(logError))
            .catch(logError))
        .catch(logError); 
    loginClient.login('username', 'password', validateToken)
        .then(validateAndLog)
        .catch(logError);
}());
