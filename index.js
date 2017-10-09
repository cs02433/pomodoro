import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Pomodoro from './pomodorostate';
import { createStore } from 'redux'

var reducer = createStore(Pomodoro);

function onClick(e) {
    switch(e.target.value) {
        case 'Start' : startPom();break;
        case 'Stop'  : stopPom();break;
        default : stopPom();
    }
}

function startPom() {
    reducer.dispatch({
        type:"start"
    });

    var interval =  setInterval(function(){
        reducer.dispatch({type:'status'});
        var st= reducer.getState();
        if(st.status === 'stopped') {
            clearInterval(interval);
        }

    }, 500);
}


function stopPom() {
    reducer.dispatch({
        type:"stop"
    });
}

function render() {
    var currstate = reducer.getState();
    ReactDOM.render(<App message={currstate.message}
    remaining={currstate.remainingTime}
    onClick={onClick} state={currstate.buttonState}/>, document.getElementById('root'));
}

render();
reducer.subscribe(render);