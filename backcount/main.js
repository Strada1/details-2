const button = document.querySelector('.button');

const backCount = ()=>{
    const result = document.getElementById('result');
    const nowDate = Date.now()
    const dateValue = document.getElementById('date').value;
    const date = Date.parse(dateValue)

    const myDate = new Date(date)
    let mainDate = nowDate>myDate?nowDate-myDate:myDate-nowDate
    const oneDay = 1000 * 60 * 60 * 24; 
    const year = Math.floor(mainDate / 3.156e+10);
    mainDate -= year * 3.156e+10;
    const month = Math.floor(mainDate / 2.628e+9)
    mainDate -= month*2.628e+9;
    const diffInDays = Math.round(mainDate / oneDay); 
    mainDate -= diffInDays * oneDay;
    const hours = Math.round(mainDate/3.6e+6)
    result.textContent = `До этой даты
    ${year} лет
    ${month} месяцев
    ${diffInDays} дней
    ${hours} часов`
}

button.addEventListener('click',backCount)