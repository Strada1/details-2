import UI_ELEMENTS from './ui-elements.js'
import CONTENT from './content.js'
import {
  dataForUI,
  colors,
  defaultDataForUI,
  renderForContent,
} from './index.js'

export let lang = JSON.parse(localStorage.getItem('lang')) //===>><<===
if (!lang) {
  lang = 'eng'
}

UI_ELEMENTS.BUTTONS.colorsButtons.forEach((item) =>
  item.addEventListener('click', changeColor)
)
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
  UI_ELEMENTS.BODY.style.background =
    'linear-gradient(45deg, ' + colors.color1 + ', ' + colors.color2 + ')'
  localStorage.setItem('colors', JSON.stringify(colors)) // <<======>>
}

UI_ELEMENTS.BUTTONS.buttonEdit.addEventListener('click', showModalWindowForEdit)
function showModalWindowForEdit() {
  UI_ELEMENTS.MODAL_WINDOW.container.classList.add('active')
  UI_ELEMENTS.MODAL_WINDOW.container.addEventListener(
    'click',
    closeModalWindowByClickOutside
  )
}
function closeModalWindowByClickOutside() {
  if (event.target.classList.contains('container-edit')) {
    UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')
  }
}

UI_ELEMENTS.MODAL_WINDOW.form.addEventListener('submit', makeChanges)
function makeChanges(event) {
  event.preventDefault()

  dataForUI.title = event.target[0].value
  dataForUI.date = event.target[1].value
  dataForUI.time = event.target[2].value

  UI_ELEMENTS.TITLE.textContent = dataForUI.title
  UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')

  localStorage.setItem('dataForUI', JSON.stringify(dataForUI)) // <<======>>
}

UI_ELEMENTS.MODAL_WINDOW.resetButton.addEventListener(
  'click',
  resetTitleAndDate
)
function resetTitleAndDate() {
  event.preventDefault()
  dataForUI.title = CONTENT.title[lang]
  dataForUI.time = defaultDataForUI.time
  dataForUI.date = defaultDataForUI.date
  localStorage.setItem('dataForUI', JSON.stringify(dataForUI)) // <<======>>

  UI_ELEMENTS.TITLE.textContent = CONTENT.title[lang]
  UI_ELEMENTS.MODAL_WINDOW.inputForTitle.value = CONTENT.title[lang]
  UI_ELEMENTS.MODAL_WINDOW.inputForTime.value = defaultDataForUI.time
  UI_ELEMENTS.MODAL_WINDOW.inputForDate.value = defaultDataForUI.date
  UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')
}

UI_ELEMENTS.MODAL_WINDOW.closeButton.addEventListener('click', closeModalWindow)
function closeModalWindow() {
  UI_ELEMENTS.MODAL_WINDOW.container.classList.remove('active')
}

UI_ELEMENTS.MODAL_WINDOW.languageButtons.forEach((item) => {
  item.addEventListener('click', changeLanguage)
  if (item.dataset.lang === lang) {
    item.classList.add('active')
  }
})
function changeLanguage(e) {
  UI_ELEMENTS.MODAL_WINDOW.languageButtons.forEach((item) => {
    item.classList.remove('active')
  })
  e.target.classList.add('active')
  lang = e.target.dataset.lang
  localStorage.setItem('lang', JSON.stringify(lang)) // <<======>>
  renderForContent(lang)
}
