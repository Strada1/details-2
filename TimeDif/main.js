import { intervalToDuration, format } from 'date-fns';

const VARIABLES = {
    RESULT: document.querySelector('.out'),
    INPUT_DATE: document.querySelector('.inputDate'),
    BTN: document.querySelector('.btn'),
    CURRENT_DATE: document.querySelector('.currentDate')
};

VARIABLES.BTN.addEventListener('click', function() {
    showCurrent(VARIABLES.CURRENT_DATE);
    showInterval();
});

function render(input, obj) {
    const dateString =  `${obj.years} Years ${obj.days}
    Days ${obj.months} Months ${obj.minutes} 
    Minutes ${obj.seconds} Seconds left to Current date`;
    input.innerHTML = dateString;
}

function showCurrent(value) {
    value.innerHTML = format(new Date(), `dd MMM yyyy H:mm:ss`);
}

function showInterval() {
    const res = intervalToDuration({
        start: new Date(VARIABLES.CURRENT_DATE.innerHTML),
        end: new Date(VARIABLES.INPUT_DATE.value)
    });
    render(VARIABLES.RESULT, res);
}









