const mongoose = require('mongoose');

//define collection's schema
const pageContentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: [true, 'home']
    },
    title: {
        type: String,
        required: [false, null]
    },
    content: {
        type: String,
        required: [true, 'nothing to see here']
    }
},
    { timestamps: true }
);

//initialize model for each document  based on schema
//keep in mine the coolection is called 'posts' and I only named the document  as 'post'
//the document auto added the plural and added to collection 'posts'
const Content = mongoose.model('pageContent', pageContentSchema);

module.exports = Content;