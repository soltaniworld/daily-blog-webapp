const mongoose = require('mongoose');

//define collection's schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'why no title text?']
    },
    body: {
        type: String,
        required: [true, 'why no body text?']
    }
},
    { timestamps: true }
);

//initialize model for each document  based on schema
//keep in mine the coolection is called 'posts' and I only named the document  as 'post'
//the document auto added the plural and added to collection 'posts'
const Post = mongoose.model('post', postSchema);

module.exports = Post;