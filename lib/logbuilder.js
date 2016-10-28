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

    function buildBaseLog(type){
        return {
            "start_timestamp": now(),
            "subject_type": "individual",
            "checkpoints": [],
            "client_update_timestamp": nowMillis(),
            "creator_key": null,
            "entries": [
                {
                    "type_name": type,
                    "start_time": null,
                    "end_time": now(),
                    "checks": null,
                    "note": null,
                    "reminder_period": 0,
                    "v": 3,
                    "id": "5ny_5gezqpgdnizwlhimmg",
                    "capture_time": now(),
                    "client_update_timestamp": now() * 1000,
                    "parent": true
                }
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

    exports.setDetailsFor = (log, childDetails) => {
        let membership = childDetails.memberships[0];
        let locationKey = membership.location_key;
        let dependant = membership.dependants[0];
        let dependantKey = dependant.key;
        let childType = dependant.child_type;
        log.location_key = locationKey;
        log.stage = childType;
        log.subject_key = dependantKey;
        log.entries[0].stage = childType;
        log.entries[0].owner = dependantKey;
    };

    exports.buildSleepLog = () => {
        let baseLog = buildBaseLog('nap');
        baseLog.entries[0].sleep_type = 'overnight';
        baseLog.entries[0].end_time = now();
        baseLog.entries[0].v = 3;
        return baseLog;
    };

    exports.buildBathroomLog = () => {
        let baseLog = buildBaseLog('bathroom');
        baseLog.entries[0].bathroom_type = 'diaper';
        baseLog.entries[0].action_time = now();
        baseLog.entries[0].events = [ "wet" ];
        baseLog.entries[0].v = 2;
        return baseLog;
    };

    exports.buildFoodLog = () => {
        let baseLog = buildBaseLog('food');
        baseLog.entries[0].meal_type = 'food';
        baseLog.entries[0].action_time = now();
        baseLog.entries[0].v = 2;
        baseLog.entries[0].amount = "All";
        baseLog.entries[0].food = "5 oz milk";
        return baseLog;
    };
})();