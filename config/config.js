(function(){
    exports.userSettings = {
        username: process.env.BRIGHT_HORIZONS_USERNAME,
        password: process.env.BRIGHT_HORIZONS_PASSWORD
    };

    exports.dashSettings = {
        dashMacAddress: process.env.TADPOLES_DASH_MAC_ADDRESS
    }
})();