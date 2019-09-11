const express = require('express')
const uid = require('uid')
const cors = require('cors')
let cards = require('./src/cards.json').map(card => ({ ...card, id: uid() }))

const server = express()
server.listen(3333, () => console.log('Server ready on port 3333'))
server.use(express.json())
server.use(cors())
server.set('json spaces', 2)
server.get('/cards', (req, res) => {
  res.json(cards)
})

server.get('/cards/:id', (req, res) => {
  res.json(cards.find(card => card.id === req.params.id))
})

server.post('/cards', (req, res) => {
  const newCard = { ...req.body, id: uid() }
  cards.push(newCard)
  res.json(newCard)
})

server.patch('/cards/:id', (req, res) => {
  const changes = req.body
  const index = cards.findIndex(card => card.id === req.params.id)
  const changedCard = { ...cards[index], ...changes }
  cards[index] = changedCard
  res.json(changedCard)
})

server.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  const deletedCard = cards.find(card => card.id === id)
  cards = cards.filter(card => card.id !== id)
  res.json(deletedCard)
})
