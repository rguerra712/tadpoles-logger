(function () {
   'use strict';
   'use esversion6';
   var exports = module.exports = {};

    var unirest = require('unirest');
    var querystring = require('querystring');
   
    /**
     * Bright Horizons API
     *
     * Accesses login token for use on tadpoles api
     *
     * @example
     * var client = require('./apis/brighthorizons/client');
     * var result = client.login('username', 'password');
     */
    exports.login = function (username, password){
        var token;
        var form = {
                    "username": username ,
                    "password": password ,
                    "response": "jwt"
                   };
        var formData = querystring.stringify(form);
        var contentLength = formData.length;
        unirest.post('https://familyinfocenter.brighthorizons.com/mybrightday/login')
            .headers({ 
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept-Content": "application/x-www-form-urlencoded",
                        "Accept-Encoding": "identity",
                        "X-Titanium-Id": "e59d2869-fb2e-4ec5-abfe-ec3a3f006eea",
                        "X-Requested-Wi": "XMLHttpRequest",
                        "Content-Length": contentLength.toString()
                    })
            .send(formData)
            .end(function (response) {
                if (response.status !== 200){
                    console.error(`Unable to get valid response: ${response.status} ${response.body}`);
                }
                token = response.body;
                console.log(response.body);
        });
        return token;
    };   
}());