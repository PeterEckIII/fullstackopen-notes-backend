const mongoose = require('mongoose');

if (process.argv.length > 3) {
    console.log('Give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://peter_eck:${password}@cluster0-2gtvn.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note',  noteSchema);

const note = new Note({
    content: 'HTML is easy',
    date: new Date(),
    important: true
});

const note2 = new Note({
    content: 'React is fun!',
    date: new Date(),
    important: true,
})

const note3 = new Note({
    content: 'Mongo is OK',
    date: new Date(),
    important: false
})

Note.find({}).then(res => {
    res.forEach(note => {
        console.log(note.content)
    })
    mongoose.connection.close();
})
