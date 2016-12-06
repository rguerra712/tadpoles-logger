(function () {
    'use strict';
    
    let exports = module.exports = {};

    const Consumer = require('sqs-consumer');
    const config = require('../../config/config.js');

    function getQueueUrl(){
        let awsUserId = config.awsSettings.awsUserId;
        let awsRegion = config.awsSettings.awsRegion;
        let awsQueueName = config.awsSettings.awsQueueName;
        return `https://sqs.${awsRegion}.amazonaws.com/${awsUserId}/${awsQueueName}`;
    }

    exports.watchForCommand = (handler) => {
        var app = Consumer.create({
            queueUrl: getQueueUrl(),
            handleMessage: function (message, done) {
                let body = message.Body;
                let parsed = JSON.parse(body);
                handler(parsed);
                done();
            }
        });
        
        app.on('error', function (err) {
            console.log(err.message);
        });
        
        app.start();
    };

})();