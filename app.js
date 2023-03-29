//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//const ejs = require("ejs"); // you dont need to require EJS, as long as it is set as viewengine and is installed on  npm.
const _ = require('lodash'); //use lodash to work with strings, arrays, etc..
const mongoose = require('mongoose');
const Post = require('./models/post');
const db = require('./models/connect');
const Content = require('./models/page-content');
const app = express();

//delete cache
app.set('view cache', false);
//set view engine to read ejs files
app.set('view engine', 'ejs');
//set body parser to read request body
app.use(bodyParser.urlencoded({ extended: true }));
//set public folder to be referencable to public folder in the root of the project//set static folder to be referencable to public folder in the root of the project//set public folder to
app.use(express.static("public"));


//connect to mongodb database using credentials in dotenv
db.connect(mongoose);

//load page contents from db
let homeStartingContent = "";
let aboutContent = "";
let contactContent = "";
const myPosts = []; //array of all posts
getPageContent();


// ================================== ROUTES ==================================
//home page route
app.get('/', (req, res) => {
  console.log('home page loading');
  getPosts()
    .then(() => {
      res.render('home', {
        homeStartingContent: homeStartingContent,
        posts: myPosts,
        _: _
      });
    })
    .then(() => {
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
app.get('/update/:id', (req, res) => {
  //res.render('update', {post: post})
  findByID(req, res, 'update');
});

app.post('/update/:id', (req, res) => {
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
    .then(() => {
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
    .then(() => {
      res.redirect('/');
    });
});

// add multiple sample blog posts to fill blog
app.get('/addsampleposts', (req, res) => {
  const postBlogs = require('./models/sample-posts-many');
  postBlogs();
  res.redirect('/');
})

// add page content for homepage, about page, and contact page
app.get('/addpagecontent', (req,res)=>{
  addPageContent()
  .then(()=>{
    res.redirect('/')
  });
})

// ================================== SERVER LISTENER ==================================
app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// ================================== FUNCTIONS ==================================
async function getPosts() {
  await Post.find({})
    .then(posts => {
      myPosts.length = 0;
      myPosts.push.apply(myPosts, posts);
    });
};

function findByID(req, res, view) {
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


//get page content from db
function getPageContent() {
  Content.findOne({
    page: 'home',
    title: 'intro'
  }).then((post) => {
    homeStartingContent = post.content;
  }).catch((err) => {
    homeStartingContent = "Visit /addPageContent to add sample homepage, abouts, and contant page content \n Visit /addSamplePosts to load sample blog posts"
  });
  Content.findOne({
    page: 'home',
    title: 'intro'
  }).then((post) => {
    aboutContent = post.content;
  }).catch((err) => {
    aboutContent = "Visit /addPageContent to add sample homepage, abouts, and contant page content. \n Visit /addSamplePosts to load sample blog posts"
  });
  Content.findOne({
    page: 'home',
    title: 'intro'
  }).then((post) => {
    contactContent = post.content;
  }).catch((err) => {
    contactContent = "Visit /addPageContent to add sample homepage, abouts, and contant page content \n Visit /addSamplePosts to load sample blog posts"
  });
}

//add content for home, about, and contact us if they are empty
async function addPageContent () {
  const content = require('./models/sample-page-content-many');
  await content();
  getPageContent();
}

