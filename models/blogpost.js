const mongoose = require('mongoose');

const blogpostSchema = new mongoose.Schema({

    title: { type: String, required: true },
    body: { type: String, required: true },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, default: new Date() },
    image: { type: String }
})

const model = mongoose.model('blogpostModel', blogpostSchema);
module.exports = model;