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
    // Issue is with this line - try to get the html file served for this route
})

app.get('/api/notes', (req, res) => {
    Note
        .find({})
        .then(notes => {
            res.json(notes.map(note => note.toJSON()));
        })
})

app.get('/api/notes/:id', (req, res) => {
    Note
        .findById(req.params.id)
        .then(note => {
            res.json(note.toJSON())
        })
});


const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0
    return maxId + 1;
}

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

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`)
});
