const express = require('express')//with npm installed
const uid = require('uid')//random id
const cors = require('cors')//small library with cross libraries//
const fs = require('fs').promises//file system!//

  function savecards(data){
    return fs.writeFile(__dirname + '/src/cards.json', JSON.stringify(data, null, 2))
  }
// function saveFile(fileName, data) {
//   const filePath = __dirname + '/' + fileName
//     return fs.writeFile(filePath, JSON.stringify(data, null, 2))
// }

// let cardsJson
//   try {
//     cardsJson = require('./src/cards.json') 
//   } catch (err) {
//     cardsJson = []
//   } 
  let cards = require('./src/cards.json').map(card => {
    return  card.id? card : {...card, id: uid() }
  })

const server = express()
server.listen(3333, () => console.log('Server ready on port 3333'))//the server soll in port 3333
server.use(express.json())
server.use(cors())
server.set('json spaces', 2)

server.get('/cards', (req, res) => {
  res.json(cards)
})
//when a get request for '/cards' come do that => the cards in this case should be send back as json
server.get('/cards/:id', (req, res) => {
  res.json(cards.find(card => card.id === req.params.id))
})
//this :id means that under req.params.id is this id saved
server.post('/cards', (req, res) => {
  const newCard = { ...req.body, id: uid() }
  cards.push(newCard)
  
  savecards(cards)
    .then(() => res.json(newCard))
    .catch(err => console.log('error', err))

  // cardsJson = [...cardsJson, newCard]
  // saveFile('src/cards.json', cardsJson)
  //   .then(() => console.log("file written"))
  //   .catch(err => console.log('error', err))
})

server.patch('/cards/:id', (req, res) => {
  const index = cards.findIndex(card => card.id === req.params.id)
  const changedCard = { ...cards[index], ...req.body }
  cards[index] = changedCard
  
  //cardsJson = [...cardsJson, changedCard]
  savecards(cards)
    .then(() => res.json(changedCard))
    .catch(err => console.log('error', err))
})

server.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  const deletedCard = cards.find(card => card.id === id)
  cards = cards.filter(card => card.id !== id)
  savecards(cards)
  .then(() => res.json(deletedCard))
  .catch(err => console.log('error', err))
})


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
