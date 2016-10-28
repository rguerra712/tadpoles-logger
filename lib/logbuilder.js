(function () {
    
    function now(){
        return Math.floor(nowMillis() / 1000);
    }

    function nowMillis(){
        let randomOffset = Math.floor(Math.random() * 10);
        return Date.now() + randomOffset;
    }

    function nowDateString(){
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        return `${year}-${month}-${day}`;
    }

    function generateRandomString(length){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    function generateId(){
        return `${generateRandomString(3)}_${generateRandomString(18)}`;
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
            "unviewed_data": false,
            "date": nowDateString(),
            "action_history": [],
            "key": null,
            "published": false,
            "group_key": null,
            "type_name": "daily_report",
            "delivery_state": "unsent",
            "approved": false,
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
        baseLog.meal_type = 'food';
        baseLog.action_time = now();
        baseLog.v = 2;
        baseLog.amount = "All";
        baseLog.food = "5 oz milk";
        return baseLog;
    };
})();