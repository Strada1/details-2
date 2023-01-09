import { intervalToDuration } from 'date-fns';

const UL_ELEMENTS = {
    DATA_FOR_SEARCH: document.querySelector('.dataForSearch'),
    BUTTON_SEARCH: document.querySelector('.btnSearch'),
    RESULT: document.querySelector('.result'),
};

function interval(value) {
    const INTERVAL_TO_DATE = intervalToDuration(
        {
            start: new Date(),
            end: new Date(value),
        },
        {
            locale: this.locale,
        }
    );
    chengeUI(INTERVAL_TO_DATE);
}

function chengeUI({ years, months, days, hours, minutes, seconds }) {
    const utcMoscow = 3;

    UL_ELEMENTS.RESULT.textContent = `
    Years: ${years},
    Months: ${months},
    Days: ${days},
    Hours: ${hours - utcMoscow},
    Minutes: ${minutes},
    Seconds: ${seconds},`;
}

UL_ELEMENTS.BUTTON_SEARCH.addEventListener('click', (event) => {
    event.preventDefault();

    const SEARCH_DATA = UL_ELEMENTS.DATA_FOR_SEARCH.value;
    interval(SEARCH_DATA);
});
