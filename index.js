const pluralize = require('./pluralize.js');
const notifier = require('node-notifier');


function createMessage(minute, endMinute){
    const minuteNames = ['минута','минуты','минут'];
    let message = "";

    if(minute===0){
        let now = new Date();
        message = "Работа началась в " + now.getHours() + ":" + now.getMinutes() + ".";
        return message;
    }
    if(minute===endMinute){
        message = "Время работы закончилось";
        return message;
    }

    if (minute===1){
        message += "Прошла ";
    }
    else{
        message += "Прошло ";
    }
    message += minute + " " + pluralize(minute,  minuteNames) + ".";
    return message;
}



function timer(minute, endMinute){

    if (minute === 0) {
        notifier.notify({
            title: 'Время работать!',
            message: 'Одно дело за раз.',
            icon: './icons/icon_work.png',
            sound: false
        });
    }

    console.log(createMessage(minute, endMinute));

    if (minute === endMinute) {
        notifier.notify({
            title: 'Время перерыва!',
            message: 'Встать со стула, размяться!',
            icon: './icons/icon_rest.png',
            sound: false
        });
        return;
    }


    let minuteTime = 60000;

    setTimeout(function(){
        timer(minute+1, endMinute);
    }, minuteTime);

}

function init() {
    let timeout = Number(process.argv[2]);
    if (!timeout) {
        timeout = 25;
    }

    timer(0, timeout);
}


init();