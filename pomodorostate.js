var workFor = 1500;//seconds
var breakFor = 300;//seconds
function Pomodoro(state=getDefaultState(), action) {
        console.log(state);
       switch(action.type) {
        case 'start' :
            return start(state);
        case 'stop'  :
            return stop(state);
        case 'status':
            return status(state);
        default :
           return getDefaultState();
       }

}

function getDefaultState() {
        return {
            status: "stopped",
            message: "Start Work",
            buttonState:"Start",
            startTime:'',
            remainingTime: 0
        };
}
function start() {
    return {
        status: "running",
        buttonState:"Stop",
        message: "Stay Focused",
        startTime:parseInt(new Date().getTime()/1000, 10),
        remainingTime:format(workFor)
    };
}

function stop() {
    return getDefaultState();
}

function status(state) {
    switch(state.status) {
        case 'stopped': return state;
        case 'running': return getRemainingTime(state);
        case 'break': return getRemainingBreakTime(state);
        default: return state;

    }
}

function getRemainingBreakTime(state) {
    var startedTime = state.startTime;

    var remainingTime = parseInt(new Date().getTime()/1000, 10)- startedTime;

    if((workFor+breakFor - remainingTime) > 0) {
        return {
                status: "break",
                message: "Relax",
                buttonState:"Start",
                breaks:state.breaks,
                startTime:state.startTime,
                remainingTime:format(workFor+breakFor - remainingTime)
        }
    } else {
        return getDefaultState();
    }

}

function getRemainingTime(state) {
    var startedTime = state.startTime;

    var remainingTime = parseInt(new Date().getTime()/1000, 10)- startedTime;

    if((workFor - remainingTime) > 0) {
        return {
                status: "running",
                message: "Stay Focused",
                buttonState:"Stop",
                breaks:state.breaks,
                startTime:state.startTime,
                remainingTime:format(workFor - remainingTime)
        }
    } else {
        return {
                        status: "break",
                        message: "Relax",
                        buttonState:"Start",
                        breaks:state.breaks+1,
                        startTime:state.startTime,
                        remainingTime:format(breakFor)
                }
    }
}


function format(timeInSeconds) {
    var seconds = timeInSeconds % 60;
    var minutes = parseInt(timeInSeconds / 60, 10);
    return minutes + ":" + (seconds? seconds : "00");
}

export default Pomodoro;