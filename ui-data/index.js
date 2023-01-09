import formatDistance from 'date-fns/formatDistance'
const form=document.querySelector('.form')
const button=document.querySelector('.click')
const data=document.querySelector('.data')
const viewResult=document.querySelector('.res')
button.addEventListener('click',(e)=>{
  e.preventDefault()
  if(data.value===''){
    data.style.backgroundColor="red"
    alert('введите дату')
  }
  else{
    data.style.backgroundColor="white"
  CalculateDate(data.value)}
})

function CalculateDate(data){
  let today=new Date
  let resultate=(formatDistance(Date.parse(today),Date.parse(data) ))
  viewResult.textContent=(resultate)
}