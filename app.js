//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//const ejs = require("ejs"); // you dont need to require EJS, as long as it is set as viewengine and is installed on  npm.
const _ = require('lodash'); //use lodash to work with strings, arrays, etc..
const mongoose = require('mongoose');
const Post = require('./models/post');
const db = require('./models/connect');


const homeStartingContent = "Welcome to my personal blog site! Here, you will find a collection of my thoughts, ideas, and experiences as I navigate through life. I am passionate about sharing my insights on a variety of topics, ranging from personal growth and development, to travel, food, and culture. Whether you're looking for inspiration, entertainment, or simply a new perspective, I hope that my blog will provide you with valuable insights and a fresh outlook on life. Join me on this journey as we explore the world together, one blog post at a time.";
const aboutContent = "Hello and welcome to my blog! My name is Ash, and I am the creator and writer behind this platform. I started this blog as a way to share my experiences, ideas, and perspectives with the world. I am passionate about personal growth and development, and I believe that we can all learn something from one another. Whether it's through travel, trying new foods, or simply taking the time to reflect on our lives, there is always something to learn and discover. Through this blog, I hope to inspire and motivate others to live their best lives and to embrace all the beauty and wonder that the world has to offer. Thank you for joining me on this journey, and I hope that you find something here that speaks to you.";
const contactContent = "Thank you for taking the time to visit my blog. If you have any questions, comments, or just want to say hello, please feel free to reach out to me using the contact form below. I always love hearing from my readers and value your feedback. Whether you have a suggestion for a future blog post or just want to share your thoughts, I am here to listen. I will do my best to respond to your message as soon as possible. Thank you again for your interest in my blog, and I look forward to connecting with you soon!";
const app = express();

//delete cache
app.set('view cache', false);

//set view engine to read ejs files
app.set('view engine', 'ejs');
//set body parser to read request body
app.use(bodyParser.urlencoded({ extended: true }));
//set public folder to be referencable to public folder in the root of the project//set static folder to be referencable to public folder in the root of the project//set public folder to
app.use(express.static("public"));
//array containing all blogs
const myPosts = [];

//connect to mongodb database using credentials in dotenv
db.connect(mongoose);

//home page route
app.get('/', (req, res) => {
  console.log('home page loading');
  getPosts()
  .then(()=>{
    res.render('home', {
      homeStartingContent: homeStartingContent,
      posts: myPosts,
      _ : _
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

//update post
app.get('/update/:id', (req, res)=>{
  //res.render('update', {post: post})
  findByID(req, res, 'update');
});

app.post('/update/:id', (req, res)=>{
  console.log(req.body.postTitle);
  console.log(req.body.postBody);
  Post.findByIdAndUpdate(req.params.id, {
    title: req.body.postTitle,
    body: req.body.postBody
  }).exec();
  res.redirect(`/posts/${req.body.postTitle}/id/${req.body.postID}`);
});

//get route for post page using ID
app.get(`/posts/:post/id/:id`, (req, res) => {
  //find by ID
  findByID(req, res, 'post');
});

// delete post by ID
app.post('/delete/:id', (req, res) => {
  console.log("delete initiated: ID: " + req.params.id);
  Post.findByIdAndDelete(req.params.id).exec()
    .then(()=>{
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
  
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
  postOnline.save()
  .then(()=>{
    res.redirect('/');
  });
  
});

async function getPosts() {
  await Post.find({})
    .then(posts => {
      myPosts.length = 0;
      myPosts.push.apply(myPosts, posts);
    });
};

function findByID (req, res, view){
  //find by title
  //Post.findOne({ title: { $regex: new RegExp(req.params.post, "i") } })
  //find by ID
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (post) {
        res.render(view, { post: post });
      } else {
        res.status(404).send('Post not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
}

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
