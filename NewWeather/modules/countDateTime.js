import { format } from 'date-fns'

function getHumanHours(value) {
    return format(new Date(value), 'HH:MM');
};

function dateTimeToHuman(value) {
    return format(new Date(value), 'MM/dd');
}

const months = [
    "January","February","March",
    "April","May","June",
    "July","August","September",
    "October","November","December"
];

function getCelsius(num) {
    try{
        if(isNaN(num)) throw new SyntaxError('Ошибка');
        const res = Math.floor(num - 273.15);
        return res
    } catch(err) {
        console.log('Ошибка');
    }
};

export {getCelsius, getHumanHours, dateTimeToHuman, months};