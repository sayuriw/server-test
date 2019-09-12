const express = require('express')
const uid = require('uid')
const router = express.Router()
const saveFile = require('../saveFile')

let users = require('../data/users.json').map(user => {
  return user.id ? user : { ...user, id: uid() }
})

router.get('/', (req, res) => {
  res.json(users)
})

router.get('/:id', (req, res) => {
  res.json(users.find(user => user.id === req.params.id))
})

router.post('/', (req, res) => {
  const newUser = { ...req.body, id: uid() }
  users.push(newUser)
  saveFile('users.json', users)
    .then(() => res.json(newUser))
    .catch(err => console.log('error', err))
})

router.patch('/:id', (req, res) => {
  const index = users.findIndex(user => user.id === req.params.id)
  const changedUser = { ...users[index], ...req.body }
  users[index] = changedUser
  saveFile('users.json', users)
    .then(() => res.json(changedUser))
    .catch(err => console.log('error', err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const deletedUser = users.find(user => user.id === id)
  users = users.filter(user => user.id !== id)
  saveFile('users.json', users)
    .then(() => res.json(deletedUser))
    .catch(err => console.log('error', err))
})

module.exports = router
