function getCelsius(num) {
    try{
        if(isNaN(num)) throw new SyntaxError('Ошибка');
        const res = Math.floor(num - 273.15);
        return res
    } catch(err) {
        console.log('Ошибка');
    }
};

function getHumanHours(date) {
    const H = addZeroToNumber(date.getHours());
    const M = addZeroToNumber(date.getMinutes());
    return `${H}:${M}`
};

function dateTimeToHuman(value) {
    const day = value.getDate();
    const month = months[value.getMonth()];
    return `${day} ${month}`
}

function addZeroToNumber(value) {
    return (value < 10) ? '0' + value : value
}

const months = [
    "January","February","March",
    "April","May","June",
    "July","August","September",
    "October","November","December"
];

export {getCelsius, getHumanHours, dateTimeToHuman, months, addZeroToNumber};