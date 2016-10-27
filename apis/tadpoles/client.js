(function () {
    'use strict';

    let exports = module.exports = {};

    let unirest = require('unirest');
    let querystring = require('querystring');
    const domain = 'https://www.tadpoles.com';
    
    /**
     * Validates a token from the bright horizons client
     *
     * @example
     * let client = require('./apis/tadpoles/client');
     * let result = client.validateToken('token', onValidate);
     */
    exports.validateToken = (token, onValidate) => {
        let form = {
                    "token": token
                };
        let formData = querystring.stringify(form);
        let headers = getDefaultHeaders(formData);
        unirest.post(domain + '/auth/jwt/validate')
            .headers(headers)
            .send(formData)
            .end(function (response) {
                if (response.status !== 200){
                    console.error(`Unable to get valid response: ${response.status} ${response.body}`);
                }
                onValidate(extractCookie(response));
        });
    };

    /**
     * Validates a login given a cookie from a tadpoles validation
     *
     * @example
     * let client = require('./apis/tadpoles/client');
     * let result = client.validateLogin('cookie', onValidate);
     */
    exports.validateLogin = (cookie, onValidate) => {
        let form = {
                "available_memory": "9915384",
                "uses_dst":  "true",
                "utc_offset": "-06 % 3A00",
                "tz": "America % 2FChicago",
                "logged_in": "true",
                "locale": "en - US",
                "state": "client",
                "v": "2",
                "battery_level": "-1",
                "app_version": "6.5.19",
                "platform_version": "6.0.1",
                "ostype": "32bit",
                "os_name": "android"
            };
        let formData = querystring.stringify(form);
        let headers = getDefaultHeaders(formData);
        unirest.post(domain + '/remote/v1/athome/admit')
            .headers(headers)
            .jar(buildCookieJar(cookie))
            .send(formData)
            .end(function (response) {
                if (response.status !== 200){
                    console.error(`Unable to get valid response: ${response.status} ${response.body}`);
                }
                onValidate(extractCookie(response));
        });
    };

    /**
     * Get details about your child for further posts
     *
     * @example
     * let client = require('./apis/tadpoles/client');
     * let result = client.getChildDetails('cookie', onRetrieval);
     */
    exports.getChildDetails = (cookie, onRetrieval) => {
        let headers = getDefaultHeaders();
        unirest.get(domain + '/remote/v1/parameters?include_all_kids=true&include_guardians=True')
            .headers(headers)
            .jar(buildCookieJar(cookie))
            .end(function (response) {
                if (response.status !== 200){
                    console.error(`Unable to get valid response: ${response.status} ${response.body}`);
                }
                let parsed = JSON.parse(response.body);
                onRetrieval(cookie, parsed);
        });
    };

    /**
     * Log a report about your child
     *
     * @example
     * let client = require('./apis/tadpoles/client');
     * let result = client.logReport('cookie', childDetails);
     */
    exports.logReport = (cookie, childDetails, log) => {
        let headers = getDefaultHeaders();
        let logString = JSON.stringify(log);
        let formData = `daily_report=${encodeURIComponent(logString)}`; 
        unirest.post(domain + '/remote/v1/daily_report/parent')
            .headers(headers)
            .jar(buildCookieJar(cookie))
            .send(formData)
            .end(function (response) {
                if (response.status !== 200){
                    console.error(`Unable to get valid response: ${response.status} ${response.body}`);
                }
        });
    };

    function getDefaultHeaders(formData){
        let headers = { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept-Content": "application/x-www-form-urlencoded",
                    "Accept-Encoding": "identity",
                    "X-Titanium-Id": "e59d2869-fb2e-4ec5-abfe-ec3a3f006eea",
                    "X-Requested-Wi": "XMLHttpRequest"
                };
        if (formData){
            headers['Content-Length'] = formData.length.toString();
        }
        return headers;
    }

    function extractCookie(response){
        let cookie = response.headers['set-cookie'][0];
        return cookie.split(';')[0];  
    }

    function buildCookieJar(cookieKeyValue){
        let cookieJar = unirest.jar();
        cookieKeyValue = cookieKeyValue.replace(/['"]+/g, '');
        let cookieValue = unirest.cookie(cookieKeyValue);
        cookieJar.add(cookieValue, domain);
        return cookieJar;
    }
}());