import UI_ELEMENTS from './ui-elements.js'
import CONTENT from './content.js'
import { lang } from './handlers.js'

export const defaultDataForUI = {
  time: '00:00',
  date: `${new Date().getFullYear() + 1}-01-01`,
}

export let colors = JSON.parse(localStorage.getItem('colors')) //===>><<===
if (!colors) {
  colors = {
    color1: '#000',
    color2: '#000',
  }
}
UI_ELEMENTS.BODY.style.background =
  'linear-gradient(45deg, ' + colors.color1 + ', ' + colors.color2 + ')'

export let dataForUI = JSON.parse(localStorage.getItem('dataForUI')) //===>><<===
if (!dataForUI) {
  dataForUI = {}
  dataForUI.title = CONTENT.title.eng
  dataForUI.time = defaultDataForUI.time
  dataForUI.date = defaultDataForUI.date
  UI_ELEMENTS.TITLE.textContent = dataForUI.title
} else {
  UI_ELEMENTS.TITLE.textContent = dataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.inputForTitle.value = dataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.inputForTime.value = dataForUI.time
  UI_ELEMENTS.MODAL_WINDOW.inputForDate.value = dataForUI.date
}

render()
renderForContent(lang)
setInterval(render, 1000)

function render() {
  const currentDate = new Date()
  const nextYear = currentDate.getUTCFullYear() + 1

  let dateWeNeed
  if (dataForUI) {
    dateWeNeed = Date.parse(`${dataForUI.date}T${dataForUI.time}:00.000+03:00`)
  } else {
    dateWeNeed = Date.parse(`${nextYear}-01-01T00:00:00.000+03:00`)
  }
  const deference = dateWeNeed - currentDate

  const time = {}

  getTime(deference, time)
  setTimeInUI(time)

  UI_ELEMENTS.DOTS.forEach((item) => item.classList.toggle('active'))
}

function getTime(deference, time) {
  if (deference > 0) {
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
  } else {
    time.daysString = '000'
    time.hoursString = '00'
    time.minutesString = '00'
    time.secondsString = '00'

    colors.color1 = '#' + Math.random().toString(16).substr(-6)
    colors.color2 = '#' + Math.random().toString(16).substr(-6)
    UI_ELEMENTS.BODY.style.background =
      'linear-gradient(45deg, ' + colors.color1 + ', ' + colors.color2 + ')'
    UI_ELEMENTS.TITLE.textContent = CONTENT.titleFinish[lang]
    return time
  }
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

export function renderForContent(lang) {
  UI_ELEMENTS.TITLE.textContent = CONTENT.title[lang]
  UI_ELEMENTS.SUBTITLES.days.textContent = CONTENT.subtitle.days[lang]
  UI_ELEMENTS.SUBTITLES.hours.textContent = CONTENT.subtitle.hours[lang]
  UI_ELEMENTS.SUBTITLES.minutes.textContent = CONTENT.subtitle.minutes[lang]
  UI_ELEMENTS.SUBTITLES.seconds.textContent = CONTENT.subtitle.seconds[lang]
  UI_ELEMENTS.BUTTONS.buttonColor.textContent = CONTENT.buttons.color[lang]
  UI_ELEMENTS.BUTTONS.buttonGradient.textContent =
    CONTENT.buttons.gradient[lang]
  UI_ELEMENTS.BUTTONS.buttonBlack.textContent = CONTENT.buttons.black[lang]
  UI_ELEMENTS.BUTTONS.buttonEdit.textContent = CONTENT.buttons.edit[lang]

  UI_ELEMENTS.MODAL_WINDOW.label.textContent = CONTENT.modalWindow.label[lang]
  UI_ELEMENTS.MODAL_WINDOW.inputForTitle.value = CONTENT.modalWindow.input[lang]
  UI_ELEMENTS.MODAL_WINDOW.makeChangesButton.textContent =
    CONTENT.modalWindow.buttonEdit[lang]
  UI_ELEMENTS.MODAL_WINDOW.resetButton.textContent =
    CONTENT.modalWindow.buttonReset[lang]

  if (lang === 'rus' || lang === 'esp') {
    UI_ELEMENTS.BUTTONS.allButtons.forEach((item) => item.classList.add('min'))
    UI_ELEMENTS.MODAL_WINDOW.makeChangesButton.classList.add('min')
  } else {
    UI_ELEMENTS.BUTTONS.allButtons.forEach((item) =>
      item.classList.remove('min')
    )
    UI_ELEMENTS.MODAL_WINDOW.makeChangesButton.classList.remove('min')
  }
}
