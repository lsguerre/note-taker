const router = require('express').Router()
const { filterByQuery, postNote, checkNote } = require('../lib/notes')
const { notes } = require('../db/db')

router.get('/api/notes', (req, res) => {
  let results = notes
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results)
})
  
router.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString()

  if (!checkNote(req.body)) {
    res.status(400).send('This note is not properly formatted.')
  } else {
    const newNote = postNote(req.body, notes)
    res.json(newNote)
  }
})


module.exports = router