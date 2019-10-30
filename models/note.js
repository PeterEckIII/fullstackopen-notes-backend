const mongoose = require('mongoose');
const { url } = require('../secret.js');

console.log(`Connecting to ${ url }`);

mongoose.connect(url, { useNewUrlParser: true })
    .then(res => {
        console.log(`Connected to MongoDB`);
    })
    .catch(error => {
        console.log(`Error connecting to MongoDB: ${ error.message }`)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
            delete returnedObject._v
    }
});

module.exports = mongoose.model('Note', noteSchema);
