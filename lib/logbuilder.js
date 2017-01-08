(function () {
    'use strict';
    
    function now(){
        return Math.floor(nowMillis() / 1000);
    }

    function nowMillis(){
        let randomOffset = Math.floor(Math.random() * 10);
        return Date.now() + randomOffset;
    }

    function nowDateString(){
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let monthString = "" + month;
        let dayString = "" + day;
        if (month < 10)
        {
            monthString = "0" + monthString;
        }
        if (day < 10)
        {
            dayString = "0" + dayString;
        }
        let year = dateObj.getUTCFullYear();
        return `${year}-${monthString}-${dayString}`;
    }

    function generateRandomString(length){
        let text = "";
        let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    function generateId(){
        // example ohwa7aszr-qgwb92qdejpg
        return `${generateRandomString(7)}_${generateRandomString(4)}`;
    }

    function buildBaseLog(type){
        return {
                    "type_name": type,
                    "start_time": null,
                    "end_time": now(),
                    "checks": null,
                    "note": null,
                    "reminder_period": 0,
                    "v": 3,
                    "id": generateId(),
                    "capture_time": now(),
                    "client_update_timestamp": now() * 1000,
                    "parent": true
                };
    }

    function buildBaseMessage(){
        return {
            "start_timestamp": now(),
            "subject_type": "individual",
            "checkpoints": [],
            "client_update_timestamp": nowMillis(),
            "creator_key": null,
            "entries": [
            ],
            "batch": false,
            "unviewed_data": true,
            "date": nowDateString(),
            "teachers": null,
            "action_history": [],
            "key": null,
            "published": false,
            "group_key": null,
            "type_name": "daily_report",
            "delivery_state": "unsent",
            "approved": null,
        };
    }

    exports.createLogsFor = (childDetails, logs) => {
        let membership = childDetails.memberships[0];
        let locationKey = membership.location_key;
        let dependant = membership.dependants[0];
        let dependantKey = dependant.key;
        let childType = dependant.child_type;
        let message = buildBaseMessage();
        message.location_key = locationKey;
        message.stage = childType;
        message.subject_key = dependantKey;
        message.creator_key = membership.key;
        logs.forEach(log => {
            log.stage = childType;
            log.owner = dependantKey;
        });
        message.entries = logs;
        return message;
    };

    exports.buildSleepLog = () => {
        let baseLog = buildBaseLog('nap');
        baseLog.sleep_type = 'overnight';
        baseLog.end_time = now();
        baseLog.v = 3;
        return baseLog;
    };

    exports.buildBathroomLog = () => {
        let baseLog = buildBaseLog('bathroom');
        baseLog.bathroom_type = 'diaper';
        baseLog.action_time = now();
        baseLog.events = [ "wet" ];
        baseLog.v = 2;
        return baseLog;
    };

    exports.buildFoodLog = () => {
        let baseLog = buildBaseLog('food');
        baseLog.meal_type = 'bottle';
        baseLog.action_time = now();
        baseLog.v = 2;
        baseLog.amount = 3;
        baseLog.contents = "breastmilk";
        return baseLog;
    };
})();