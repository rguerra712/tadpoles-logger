(function () {
    'use strict';
    
    let exports = module.exports = {};

    const AWS = require('aws-sdk');
    const config = require('../../config/config.js');
    const sqsCommandHandler = require('../../lib/sqs/command-handler.js');
    const crypto = require("crypto-js");

    function getQueueUrl(){
        let awsUserId = config.awsSettings.awsUserId;
        let awsRegion = config.awsSettings.awsRegion;
        let awsQueueName = config.awsSettings.awsQueueName;
        return `https://sqs.${awsRegion}.amazonaws.com/${awsUserId}/${awsQueueName}`;
    }

    exports.watchForCommand = (sqsCommandHandler) => {
        var sqs = new AWS.SQS({apiVersion: '2012-11-05', params: {QueueUrl: getQueueUrl()}}); // using url to queue
        sqs.receiveMessage(function(err,data){
            if(err) {
                console.log('error:',"Fail Send Message" + err);
            } else {
                let messages = data.Messages;
                if (messages && messages.length == 1){
                    let message = messages [0];
                    let body = message.Body;
                    let parsed = JSON.parse(body);
                    sqsCommandHandler(parsed);
                    let deleteParams = {
                        ReceiptHandle: message.ReceiptHandle
                    };
                    
                    sqs.deleteMessage(deleteParams, function(err, data){
                        if (err) {
                            console.log(err, err.stack); // an error occurred
                        }
                        else {
                            console.log(data);           // successful response
                        }
                    });
                }
            }
        });
    };

})();