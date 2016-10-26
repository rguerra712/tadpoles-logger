(function (){
    'use strict';
    
    let loginClient = require('./apis/brighthorizons/client');
    let tadpolesClient = require('./apis/tadpoles/client');
    
    let logReport = (cookie, childDetails) => tadpolesClient.logReport(cookie, childDetails);
    let getChildDetails = cookie => tadpolesClient.getChildDetails(cookie, logReport);
    let validateLogin = cookie => tadpolesClient.validateLogin(cookie, getChildDetails);
    let validateToken = token => tadpolesClient.validateToken(token, validateLogin);
    let token = loginClient.login('username', 'password', validateToken);
}());
