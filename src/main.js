
import { postCard, getAllCards, deleteCard, getSingleCard, changeCard } from './services'
//import { start } from 'repl'

// start()

// async function start() {
//   try {
//     const cards = await getAllCards()
//     cards.forEach(createCard)
//   } catch (error) {
//     console.log(error)
//   }
// } 

let editingId

getAllCards()
  .then(cards => cards.forEach(createCard))

const form = document.querySelector('form')

  form.addEventListener('submit', event => {
  event.preventDefault()
  const input = document.querySelector('.input')
  const cardFormData = new FormData(form)
  //[['title', 'my title'],['question', 'quats up']] --> the FormData(form)
  //gets automatically the data in the formular
  const card = Object.fromEntries(cardFormData)
  //that Object.fromEntries turns the cardFormData in an object with
  //key-value pairs
    if (editingId) {
      changeCard(editingId, card).then(onCardEdited)
    } else {
      postCard(card).then(createCard)
    }
  
  form.reset()
  input.focus()
})

function onCardEdited(card) {
  editingId = null
  const el = document.querySelector(`.card[data-id="${card.id}"]`)
  el.replaceWith(createCard(card))
}

const placeholder = document.querySelector('.placeholder')


function createCard(card) {
  const {title, question, answer, id} = card
  const el = document.createElement('div')
  el.classList.add('card')
  el.setAttribute('data-id', id)
  placeholder.insertAdjacentElement('afterbegin',el)
  el.innerHTML = `<h2>${card.title}</h1>
                  <span>${card.question}</span>
                  <span>${card.answer}</span>`
                                              
const buttonDelete = document.createElement('button')
buttonDelete.textContent = 'delete'
buttonDelete.classList.add('delete')
buttonDelete.addEventListener('click', () => {
  deleteCard(id)
    .then(() => el.remove())
})
el.appendChild(buttonDelete)
  
const buttonEdit = document.createElement('button')
buttonEdit.textContent = 'Edit'
buttonEdit.classList.add('edit')
buttonEdit.addEventListener('click', () => {
    editingId = id
    form.title.value = title
    form.question.value = question
    form.answer.value = answer
  
})
el.appendChild(buttonEdit)
return el
}


  


