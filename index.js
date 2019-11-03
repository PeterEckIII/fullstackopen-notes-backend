require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Note = require('./models/note');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + './build/index.html');
})

app.get('/api/notes', (req, res) => {
    Note
        .find({})
        .then(notes => {
            res.json(notes.map(note => note.toJSON()));
        })
})

app.get('/api/notes/:id', (req, res, next) => {
    Note
        .findById(req.params.id)
        .then(note => {
            note
                ? res.json(note.toJSON())
                : res.status(404).end()
        })
        .catch(e => next(e))
});

app.put('/api/notes/:id', (req, res, next) => {
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

app.post('/api/notes', (req, res) => {
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
})

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(e => next(e))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name === 'Cast Error' && error.kind === 'ObjectID') {
        return res.status(404).send({ error: 'Malformatted ID' })
    }

    next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`)
});
