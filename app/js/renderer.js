var hour = 00;
var minute = 00;
var second = 00;

var interval = null;

window.onload = function() {
    var start = document.getElementById('btn_start');
    var pause = document.getElementById('btn_pause');
    var reset = document.getElementById('btn_reset');

    start.addEventListener('click', () => {
        interval = setInterval(startTime, 1000);
    });

    pause.addEventListener('click', () => {
        clearInterval(interval);
    });

    reset.addEventListener('click', () => {
        clearInterval(interval);
        [second, minute, hour] = [0, 0, 0];
        document.getElementById('t_m').innerHTML = "00";
        document.getElementById('t_h').innerHTML = "00";
        document.getElementById('t_s').innerHTML = "00";
    });
}

function startTime() {
    second++;

    if (second / 60 === 1) {
        second = 0;
        minute++;
        if (minute / 60 === 1) {
            minute = 0;
            hour++;
        }
    }

    if (second < 10) {
        document.getElementById('t_s').innerHTML = "0" + second;
    }
    if (second > 9) {
        document.getElementById('t_m').innerHTML = second;
    }
    if (second > 59) {
        minute++;
        document.getElementById('t_m').innerHTML = "0" + minute;
        second = 0;
        document.getElementById('t_m').innerHTML = "0" + 0;
    }
    if (minute < 9) {
        document.getElementById('t_m').innerHTML = "0" + minute;
    }
    if (minute > 9) {
        document.getElementById('t_m').innerHTML = minute;
    }
    if (minute > 59) {
        hour++;
        document.getElementById('t_h').innerHTML = "0" + hour;
        minute = 0;
        document.getElementById('t_m').innerHTML = "0" + 0;
    }
}