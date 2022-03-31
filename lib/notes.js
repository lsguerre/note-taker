const fs = require('fs')
const path = require('path')

function filterByQuery(query, notesArray) {
    let notesResults = notesArray
    if (query.title) {
        notesResults = notesResults.filter(
            (notes) => notes.title === query.title
        )
    }    
    return notesResults
  }

  function postNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ newNotes : notesArray }, null, 2)
    );
    return newNote
  }

  function checkNote(newNote) {
    if (!newNote.title || typeof newNote.title !== 'string') {
      return false
    }
    if (!newNote.text || typeof newNote.text !== 'string') {
      return false
    }
    
    return true
  }

  module.exports = {
      filterByQuery,
      postNote,
      checkNote
  }