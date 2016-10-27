(function (){
    'use strict';
    
    let loginClient = require('./apis/brighthorizons/client');
    let tadpolesClient = require('./apis/tadpoles/client');
    let logBuilder = require('./lib/logbuilder');
    
    let logReport = (cookie, childDetails, log) => tadpolesClient.logReport(cookie, childDetails, log);
    let logReports = (cookie, childDetails) => {
        let logs = [
                logBuilder.buildSleepLog(childDetails),
                logBuilder.buildBathroomLog(childDetails),
                logBuilder.buildFoodLog(childDetails)
            ];
        logs.forEach(log => {
            logReport(cookie, childDetails, log);
        });
    }
    let getChildDetails = cookie => tadpolesClient.getChildDetails(cookie, logReports);
    let validateLogin = cookie => tadpolesClient.validateLogin(cookie, getChildDetails);
    let validateToken = token => tadpolesClient.validateToken(token, validateLogin);
    let token = loginClient.login('username', 'password', validateToken);
}());
