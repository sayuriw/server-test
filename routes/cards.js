const express = require('express')//with npm installed
const uid = require('uid')//random id
const router = express.Router()
const saveFile = require('../saveFile')

let cards = require('../data/cards.json').map(card => {
  return  card.id? card : {...card, id: uid() }
})

router.get('/', (req, res) => {
  res.json(cards)
})

router.get('/:id', (req, res) => {
  res.json(cards.find(card => card.id === req.params.id))
})

router.post('/', (req, res) => {
  const newCard = { ...req.body, id: uid() }
  cards.push(newCard)
  saveFile('cards.json', cards)
    .then(() => res.json(newCard))
    .catch(err => console.log('error', err))
})

router.patch('/:id', (req, res) => {
  const index = cards.findIndex(card => card.id === req.params.id)
  const changedCard = { ...cards[index], ...req.body }
  cards[index] = changedCard
  saveFile('cards.json', cards)
    .then(() => res.json(changedCard))
    .catch(err => console.log('error', err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const deletedCard = cards.find(card => card.id === id)
  cards = cards.filter(card => card.id !== id)
  saveFile('cards.json', cards)
  .then(() => res.json(deletedCard))
  .catch(err => console.log('error', err))
})



module.exports = router