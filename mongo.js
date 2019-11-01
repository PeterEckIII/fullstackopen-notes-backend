const mongoose = require('mongoose');

if (process.argv < 3) {
    console.log('Give password as argument')
    process.exit(1);
}

const password = process.argv[ 2 ];

const url = `mongodb+srv://jpeckiii:${ password }@notes-ej5it.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema);

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close();
});

// const note = new Note({
//     content: 'React is fun!',
//     date: new Date(),
//     important: true
// });

// note.save().then(res => {
//     console.log('Note saved!')
//     mongoose.connection.close();
// })
