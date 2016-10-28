(function(){
    
    const commandLineArgs = require('command-line-args')
    const optionDefinitions = [
        { name: 'username', alias: 'u', type: String },
        { name: 'password', alias: 'p', type: String },
        { name: 'mac', alias: 'm', type: String }
    ];
    const options = commandLineArgs(optionDefinitions)

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
    
    exports.userSettings = {
        username: settings.username,
        password: settings.password
    };

    exports.dashSettings = {
        dashMacAddress: settings.dashMacAddress
    }
})();