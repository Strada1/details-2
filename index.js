const button = document.querySelector('button')
const inputDate = document.querySelector('#data_input')
const label = document.querySelector('label')
const span = document.createElement('span')
let selectedDate;
let isSelected = false
inputDate.addEventListener('change', (e) => {
    isSelected = true
    selectedDate = new Date(e.target.value).getTime()
    if(e.target.value.length === 0) {
        isSelected = false
    }
})

function countDown() {
    if(isSelected) {
          setInterval(()=>{
        const currentDate =new Date().getTime()
        let timeLeft = selectedDate - currentDate
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        span.textContent = isSelected ? `${days}:days ${hours}:hours ${minutes}:minutes  ${seconds}:seconds left` : `Meow`
        label.appendChild(span)
    },1000)
    }
  if(!isSelected) alert('choose date')
}
if(!isSelected) {
    clearInterval(countDown)
}

button.addEventListener('click',countDown)
