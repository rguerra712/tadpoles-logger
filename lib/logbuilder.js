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

    function buildBaseLog(childDetails, type){
        let membership = childDetails.memberships[0];
        let locationKey = membership.location_key;
        let dependant = membership.dependants[0];
        let dependantKey = dependant.key;
        let childType = dependant.child_type;
        return {
            "location_key": locationKey,
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
                    "stage": childType,
                    "id": "5ny_5gezqpgdnizwlhimmg",
                    "capture_time": now(),
                    "owner": dependantKey,
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
            "stage": childType,
            "delivery_state": "unsent",
            "approved": false,
            "subject_key": dependantKey
        }
    }

    exports.buildSleepLog = childDetails => {
        let baseLog = buildBaseLog(childDetails, 'nap');
        baseLog.entries[0].sleep_type = 'overnight';
        baseLog.entries[0].end_time = now();
        baseLog.entries[0].v = 3;
        return baseLog;
    };

    exports.buildBathroomLog = childDetails => {
        let baseLog = buildBaseLog(childDetails, 'bathroom');
        baseLog.entries[0].bathroom_type = 'diaper';
        baseLog.entries[0].action_time = now();
        baseLog.entries[0].events = [ "wet" ];
        baseLog.entries[0].v = 2;
        return baseLog;
    };

    exports.buildFoodLog = childDetails => {
        let baseLog = buildBaseLog(childDetails, 'food');
        baseLog.entries[0].meal_type = 'food';
        baseLog.entries[0].action_time = now();
        baseLog.entries[0].v = 2;
        baseLog.entries[0].amount = "All";
        baseLog.entries[0].food = "5 oz milk";
        return baseLog;
    };
})();