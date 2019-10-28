require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Note = require('./models/note');

app.use(bodyParser.json());
app.use(express.static('build'));
app.use(cors());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.get('/api/notes', (req, res) => {
    Note
        .find({})
        .then(notes => {
            res.json(notes.map(note => note.toJSON()));
        })
        .catch(e => `Could not fetch notes: ${ e }`)
})

app.get('/api/notes/:id', (req, res) => {
    Note
        .findById(req.params.id)
        .then(note => {
            res.json(note.toJSON());
        })
        .catch(e => `Error finding ${ req.params.id }`)
});

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0
    return maxId + 1;

}

app.post('/api/notes', (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    note
        .save()
        .then(savedNote => {
            res.json(savedNote.toJSON())
        })
        .catch(e => `Error saving note ${ e }`);
})

app.delete('/api/notes/:id', (req, res) => {
    Note
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(e => `Error removing note ${ e }`)
    res.status(204).end();
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`)
});
