const express = require('express');
const notesCtrl = require('../controllers/notes.controllers');

const router = express.Router();

router.route('/api/notes')
    .get(notesCtrl.getNotes)
    .post(notesCtrl.createNote);

router.route('/api/notes/:id')
    .delete(notesCtrl.deleteNote)
    .put(notesCtrl.updateNote)
    .get(notesCtrl.getNote)
    
module.exports = router;