require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(e => {
        console.log('Error connecting to MongoDB', e.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Note', noteSchema);
