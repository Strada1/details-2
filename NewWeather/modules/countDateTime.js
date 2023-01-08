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
    return format(new Date(value), 'dd MMMM');
}

export {getCelsius, getHumanHours, dateTimeToHuman};