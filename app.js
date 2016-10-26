(function (){
    'use strict';
    
    let loginClient = require('./apis/brighthorizons/client');
    let tadpolesClient = require('./apis/tadpoles/client');
    
    let getChildDetails = (loginResult) => console.info(loginResult);
    let validateLogin = cookie => tadpolesClient.validateLogin(cookie, getChildDetails);
    let validateToken = token => tadpolesClient.validateToken(token, validateLogin);
    let token = loginClient.login('username', 'password', validateToken);
}());
