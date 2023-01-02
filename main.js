import { formatDistanceToNowStrict } from 'date-fns'

const button = document.querySelector('.button');
button.addEventListener('click', function () {
	const dateControl = document.querySelector('.date');
	const dataDom = dateControl.value;

	const textYear = document.querySelector('.year');
	const textDay = document.querySelector('.day');
	const textHour = document.querySelector('.hour');

	const resultYear = formatDistanceToNowStrict(new Date(dataDom), {
		unit: 'year'
	})
	const resultDay = formatDistanceToNowStrict(new Date(dataDom), {
		unit: 'day'
	})
	const resultHour = formatDistanceToNowStrict(new Date(dataDom), {
		unit: 'hour'
	})

	textYear.textContent = resultYear;
	textDay.textContent = resultDay;
	textHour.textContent = resultHour;
});




