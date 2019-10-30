const mongoose = require('mongoose');

const url = 'mongodb+srv://peter_eck:MarmaladeDaydream22!@cluster0-2gtvn.mongodb.net/test?retryWrites=true&w=majority'

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
