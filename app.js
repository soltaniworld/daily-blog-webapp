//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//const ejs = require("ejs"); // you dont need to require EJS, as long as it is set as viewengine and is installed on  npm.
const _ = require('lodash'); //use lodash to work with strings, arrays, etc..
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();

//replacing posts = [] as we migrate to db
const myPosts = [];

const database = 'Blog';
const username = 'ArashMongoDB';
const pw = 'cuxg7fHOBwE62SAY';
const url = 'firstcluster0.dhjrbp6.mongodb.net';
// Connect to your remote MongoDB database using Mongoose
mongoose.connect(`mongodb+srv://${username}:${pw}@${url}/${database}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })

//define collection's schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true},
  body: {
    type: String,
    required: true}
});

//initialize model for each document  based on schema
//keep in mine the coolection is called 'posts' and I only named the document  as 'post'
//the document auto added the plural and added to collection 'posts'
const Post = mongoose.model('post', postSchema);

//===================TESTING MONGOOSE READ ======================

//===================END TESTING MONGOOSE READ ======================

//set view engine to read ejs files
app.set('view engine', 'ejs');
//set body parser to read request body
app.use(bodyParser.urlencoded({ extended: true }));
//set public folder to be referencable to public folder in the root of the project//set static folder to be referencable to public folder in the root of the project//set public folder to
app.use(express.static("public"));

//home page route
app.get('/', (req, res) => {
  console.log('home page loading');
  getPosts()
  .then(()=>{
    res.render('home', {
      homeStartingContent: homeStartingContent,
      posts: myPosts
    });
  })
  .then(()=>{
    console.log('home page COMPLETE');
  });
})

//about page
app.get('/about', (req, res) => {
  res.render('about', { aboutContent: aboutContent });
});

//contact us
app.get('/contact', (req, res) => {
  res.render('contact', { contactContent: contactContent });
});

//compose GET route
app.get('/compose', (req, res) => {
  res.render('compose', {});
});

//get route for post page
app.get('/posts/:post', (req, res) => {
  //find and return the post where title matches :post parameter
  console.log("Posts page: " +  req.params.post);
  Post.findOne({ title: { $regex: new RegExp(req.params.post, "i") } })
    .then(post => {
      if (post) {
        res.render('post', { post: post });
      } else {
        res.status(404).send('Post not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// delete post by title
app.post('/delete/:title', (req, res) => {
  console.log("delete initiated: " + req.params.title);
  Post.findOneAndDelete({ title: { $regex: new RegExp(req.params.title, "i") } })
    .then(post => {
      if (post) {
        res.status(204).redirect('/'); // No Content
      } else {
        res.status(404).send('Post not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
    // res.redirect('/');
});


//compose POST route
app.post('/compose', (req, res) => {
  //variable to store posts
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  myPosts.push(post)

  // Create a new blog post object
  const postOnline = new Post(post);
  postOnline.save();

  res.redirect('/');

});

async function getPosts() {
  await Post.find({}, { _id: 1, title: 1, body: 1 })
    .then(posts => {
      myPosts.length = 0;
      myPosts.push.apply(myPosts, posts);
    });
};


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
