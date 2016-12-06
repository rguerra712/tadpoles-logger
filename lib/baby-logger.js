(function(){
    
    let exports = module.exports = {};

    let eventLogger = require('./eventlogger');
    let logBuilder = require('./logbuilder');
    
    exports.log = () => {
        let secondsDiff = moment().diff(lastEntryTime, 'seconds');
        if (lastEntryTime && secondsDiff < 60)
        {
            console.log("Log key already pressed, still waiting");
            return;
        }
        console.log("Log added to tadpoles");
        let logs = [
            logBuilder.buildSleepLog(),
            logBuilder.buildBathroomLog(),
            logBuilder.buildFoodLog()
        ];
        eventLogger.logEvents(logs);
        lastEntryTime = moment();
    };

})();