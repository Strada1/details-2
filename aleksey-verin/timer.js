const UI_ELEMENTS = {
  DIGITS: {
    daysOne: document.querySelector('.days-block').firstElementChild,
    daysTwo:
      document.querySelector('.days-block').firstElementChild
        .nextElementSibling,
    daysThree: document.querySelector('.days-block').lastElementChild,
    hoursOne: document.querySelector('.hours-block').firstElementChild,
    hoursTwo: document.querySelector('.hours-block').lastElementChild,
    MinutesOne: document.querySelector('.minutes-block').firstElementChild,
    MinutesTwo: document.querySelector('.minutes-block').lastElementChild,
    secondsOne: document.querySelector('.seconds-block').firstElementChild,
    secondsTwo: document.querySelector('.seconds-block').lastElementChild,
  },
}

let colors = JSON.parse(localStorage.getItem('colors')) //===>><<===

if (!colors) {
  colors = {
    color1: '#000',
    color2: '#000',
  }
}

document.body.style.background =
  'linear-gradient(45deg, ' + colors.color1 + ', ' + colors.color2 + ')'

document
  .querySelectorAll('.button')
  .forEach((item) => item.addEventListener('click', changeColor))

function changeColor() {
  if (this.classList.contains('button-color')) {
    colors.color1 = '#' + Math.random().toString(16).substr(-6)
    colors.color2 = colors.color1
  }
  if (this.classList.contains('button-gradient')) {
    colors.color1 = '#' + Math.random().toString(16).substr(-6)
    colors.color2 = '#' + Math.random().toString(16).substr(-6)
  }
  if (this.classList.contains('button-black')) {
    colors.color1 = '#000'
    colors.color2 = '#000'
  }
  document.body.style.background =
    'linear-gradient(45deg, ' + colors.color1 + ', ' + colors.color2 + ')'
  localStorage.setItem('colors', JSON.stringify(colors)) // <<======>>
}

render()
setInterval(render, 1000)

function render() {
  const currentDate = new Date()
  const currentYour = currentDate.getUTCFullYear()
  const nextNewYear = currentYour + 1

  const dateWeNeed = Date.parse(`${nextNewYear}-01-01T00:00:00.000+03:00`)
  const deference = dateWeNeed - currentDate

  const time = {}

  getTime(deference, time)
  setTimeInUI(time)

  document
    .querySelectorAll('.dots-block')
    .forEach((item) => item.classList.toggle('active'))
}

function getTime(deference, time) {
  const days = Math.floor(deference / 1000 / 60 / 60 / 24)
  time.daysString = String(days)
  if (time.daysString.length === 1) {
    time.daysString = '00' + time.daysString
  }
  if (time.daysString.length === 2) {
    time.daysString = '0' + time.daysString
  }

  const hours = Math.floor(
    (deference - days * 1000 * 60 * 60 * 24) / 1000 / 60 / 60
  )
  time.hoursString = String(hours)
  if (time.hoursString.length < 2) {
    time.hoursString = '0' + time.hoursString
  }

  const minutes = Math.floor(
    (deference - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60) /
      1000 /
      60
  )
  time.minutesString = String(minutes)
  if (time.minutesString.length < 2) {
    time.minutesString = '0' + time.minutesString
  }

  const seconds = Math.floor(
    (deference -
      days * 1000 * 60 * 60 * 24 -
      hours * 1000 * 60 * 60 -
      minutes * 1000 * 60) /
      1000
  )
  time.secondsString = String(seconds)
  if (time.secondsString.length < 2) {
    time.secondsString = '0' + time.secondsString
  }
  return time
}

function setTimeInUI(time) {
  UI_ELEMENTS.DIGITS.daysOne.textContent = time.daysString[0]
  UI_ELEMENTS.DIGITS.daysTwo.textContent = time.daysString[1]
  UI_ELEMENTS.DIGITS.daysThree.textContent = time.daysString[2]

  UI_ELEMENTS.DIGITS.hoursOne.textContent = time.hoursString[0]
  UI_ELEMENTS.DIGITS.hoursTwo.textContent = time.hoursString[1]

  UI_ELEMENTS.DIGITS.MinutesOne.textContent = time.minutesString[0]
  UI_ELEMENTS.DIGITS.MinutesTwo.textContent = time.minutesString[1]

  UI_ELEMENTS.DIGITS.secondsOne.textContent = time.secondsString[0]
  UI_ELEMENTS.DIGITS.secondsTwo.textContent = time.secondsString[1]
}
