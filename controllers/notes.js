const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({})
    res.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (req, res, next) => {
    const noteToGet = await Note.findById(req.params.id)
    noteToGet ? res.json(noteToGet.toJSON()) : res.status(404).end()
});

notesRouter.put('/:id', (req, res, next) => {
    const body = req.body;
    const note = {
        content: body.content,
        important: body.important
    }

    Note
        .findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote.toJSON())
        })
        .catch(e => next(e))
})

notesRouter.post('/', (req, res, next) => {
    const body = req.body;

    if (body.content === undefined) {
        return res.status(400).json({ error: 'Content missing' })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    note
        .save()
        .then(savedNote => {
            res.json(savedNote.toJSON())
        })
        .catch(e => next(e))
})

notesRouter.delete('/:id', (req, res, next) => {
    Note
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(e => next(e))
})

module.exports = notesRouter;
