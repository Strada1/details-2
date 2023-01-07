import { format } from 'date-fns';

function getCelsius(num) {
    try{
        if(isNaN(num)) throw new SyntaxError('Ошибка');
        const res = Math.floor(num - 273.15);
        return res;
    } catch(err) {
        console.log('Ошибка');
    }
}

function getHumanHours(date) {
    return format(new Date(date), 'HH:MM');
}

function dateTimeToHuman(value) {
    const day = value.getDate();
    const month = months[value.getMonth()];
    return `${day} ${month}`;
}

const months = [
    "January","February","March",
    "April","May","June",
    "July","August","September",
    "October","November","December"
];

export {getCelsius, getHumanHours, dateTimeToHuman, months};