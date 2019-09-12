const express = require('express') //with npm installed
const cors = require('cors') //small library with cross libraries//
const cardRouter = require('./routes/cards')

// function savecards(data){
//   return fs.writeFile(__dirname + '/src/cards.json', JSON.stringify(data, null, 2))
// }

// let cardsJson
//   try {
//     cardsJson = require('./src/cards.json')
//   } catch (err) {
//     cardsJson = []
//   }

const server = express()
server.listen(3333, () => console.log('Server ready on port 3333')) //the server soll in port 3333
server.use(express.json())
server.use(cors())
server.set('json spaces', 2)
server.use('/cards', cardRouter)
server.use('/users', require('./routes/users'))

//when a get request for '/cards' come do that => the cards in this case should be send back as json
//this :id means that under req.params.id is this id saved

// cardsJson = [...cardsJson, newCard]
// saveFile('src/cards.json', cardsJson)
//   .then(() => console.log("file written"))
//   .catch(err => console.log('error', err))

// let users = require('./data/users.json').map(user => {
// return {id: uid(), ...user}
// })

// server.get('/users', (req, res) => {
//   res.json(users)
// })

// server.get('/users/:id', (req, res) => {
//   res.json(users.find(user => user.id === req.params.id))
// })

// server.patch('/users/:id', (req, res) => {
//   const index = users.findIndex(user => user.id === req.params.id)
//   const changedData = { ...users[index], ...req.body }
//   users[index] = changedData
//   savecards(users)
//     .then(() => res.json(changedData))
//     .catch(err => console.log('error', err))
// })

// const express = require('express')
// const uid = require('uid')
// const cors = require('cors')
// let cards = require('./src/cards.json').map(card => ({ ...card, id: uid() }))
// const fs = require('fs').promises

// function saveFile(fileName, data) {
//   const filePath = __dirname + '/' + fileName
//     return fs.writeFile(filePath, JSON.stringify(data))
// }

// let cardsJson
//   try {
//     cardsJson = require('./cards.json')
//   } catch (err) {
//     cardsJson = []
//   }

// const server = express()
// server.listen(3333, () => console.log('Server ready on port 3333'))
// server.use(express.json())
// server.use(cors())
// server.set('json spaces', 2)
// server.get('/cards', (req, res) => {
//   res.json(cards)
// })

// server.get('/cards/:id', (req, res) => {
//   res.json(cards.find(card => card.id === req.params.id))
// })

// server.post('/cards', (req, res) => {
//   const newCard = { ...req.body, id: uid() }
//   cards.push(newCard)
//   res.json(newCard)
//   cardsJson = [...cardsJson, newCard]
//   saveFile('cards.json', cardsJson)
//     .then(() => console.log("file written"))
//     .catch(err => console.log('error', err))
// })

// server.patch('/cards/:id', (req, res) => {
//   const changes = req.body
//   const index = cards.findIndex(card => card.id === req.params.id)
//   const changedCard = { ...cards[index], ...changes }
//   cards[index] = changedCard
//   res.json(changedCard)
//   cardsJson = [...cardsJson, changedCard]
//   saveFile('cards.json', cardsJson)
//     .then(() => console.log("file written"))
//     .catch(err => console.log('error', err))
// })

// server.delete('/cards/:id', (req, res) => {
//   const id = req.params.id
//   const deletedCard = cards.find(card => card.id === id)
//   cards = cards.filter(card => card.id !== id)
//   res.json(deletedCard)
// })
