(function(){
    'use strict';

    const commandLineArgs = require('command-line-args');
    const optionDefinitions = [
        { name: 'username', alias: 'u', type: String },
        { name: 'password', alias: 'p', type: String }
    ];
    const options = commandLineArgs(optionDefinitions);

    let settings = {};

    settings.username = options.username;
    settings.password = options.password;
    
    if (!settings.username && process.env.BRIGHT_HORIZONS_USERNAME){
        settings.username = process.env.BRIGHT_HORIZONS_USERNAME; 
    }
    if (!settings.password && process.env.BRIGHT_HORIZONS_PASSWORD){
        settings.password = process.env.BRIGHT_HORIZONS_PASSWORD; 
    }
    
    exports.userSettings = {
        username: settings.username,
        password: settings.password
    };

})();