
const serverUrl = 'https://api.genderize.io';
const form = document.querySelector('.form');
form.addEventListener("submit", getName)

function getName(el) {
	el.preventDefault();
    let input = el.target.querySelector(".input");
    let name = input.value;
		if (!name) return input.value = '';
		getUrl(name)
		el.target.reset();
}

async function getUrl(name){
		const url = `${serverUrl}?name=${name}`;
		try {
			const response = await fetch(url);
			const data = await response.json()
			const value = data.gender;
			showGender(value, name)
		} catch(err) {
			alert("Сервер не найден.");
		} 
}

function showGender(gender, name) {
	const result = document.querySelector('.result')
	const div = document.createElement('div');
	div.className = 'resGender';
	div.textContent = `${name} is ${gender}`;
	result.append(div)
}








