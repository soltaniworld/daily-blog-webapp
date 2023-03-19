const mongoose = require('mongoose');
// const Post = require('./models/post');

function postBlogs () {
    // Create three new blog posts and save them to the database
    const post1 = new Post({
        title: 'Making Progress',
        body: 'Today was a productive day. I woke up early and hit the gym, which always gives me a good boost of energy. After that, I tackled some work tasks that I had been putting off for a while. I\'m happy to say that I made some real progress on them. It always feels good to check things off the to-do list. In the afternoon, I took a break to catch up with a friend over coffee. It was nice to take a mental break and chat with someone who always makes me laugh. Overall, it was a satisfying and productive day.'
    });

    const post2 = new Post({
        title: 'Chilling Out',
        body: 'This weekend was exactly what I needed. I didn\'t have any big plans, which was a nice change of pace from the usual hustle and bustle. I spent Saturday lounging around in my pajamas, watching Netflix, and catching up on some reading. In the evening, I cooked a big pot of soup and enjoyed a cozy night in. Sunday was even more low-key. I went for a leisurely walk in the park and listened to a podcast. I also did a bit of cleaning and organizing around the house, which always feels good. All in all, it was a quiet and relaxing weekend that left me feeling recharged and ready to take on the week ahead.'
    });

    const post3 = new Post({
        title: 'Getting Lost',
        body: 'Today was an adventure. I decided to take a walk in a part of town that I\'m not very familiar with. At first, it was fun to explore new streets and see different architecture. But then, I got a bit turned around and realized that I wasn\'t exactly sure how to get back to where I started. I tried retracing my steps, but that only seemed to make things worse. Eventually, I found myself on a street that I didn\'t recognize at all. I was starting to feel a bit anxious, but then I saw a little café that looked cute and inviting. I decided to stop in for a coffee and regroup. As it turned out, the café owner was incredibly friendly and helped me figure out where I was and how to get back to where I needed to go. In the end, I made it home safely, but I definitely won\'t be taking any more spontaneous walks in unfamiliar areas for a while!'
    });



    const post4 = new Post({
        title: 'Trying Something New',
        body: 'Today I decided to challenge myself and try something new. I signed up for a yoga class at a studio that I\'ve never been to before. I was a bit nervous, but also excited to push myself out of my comfort zone. The class was challenging, but also really rewarding. I felt strong and centered throughout the practice, and I left feeling refreshed and energized. I\'m glad I took the risk and tried something new.'
    });

    const post5 = new Post({
        title: 'Dealing with Stress',
        body: 'It\'s been a stressful week, and I\'ve been struggling to manage my anxiety. I\'ve been trying to take care of myself by getting enough sleep, eating well, and exercising, but it\'s still hard to shake off the feeling of tension and worry. Today, I tried something different and went for a massage. It was a little indulgent, but it really helped to release some of the tension in my muscles and calm my mind. I think I\'ll make it a regular practice to prioritize self-care and relaxation when I\'m feeling overwhelmed.'
    });

    const post6 = new Post({
        title: 'Discovering a New Hobby',
        body: 'I\'ve been feeling a bit bored and unfulfilled lately, so I decided to explore some new hobbies. I started taking a pottery class a few weeks ago, and I\'ve been really enjoying it. Today, I spent the afternoon in the studio working on a new piece. It\'s still a work in progress, but it feels good to be creating something with my hands. I\'m excited to see how it turns out.'
    });

    const post7 = new Post({
        title: 'Enjoying Nature',
        body: 'Today was a beautiful day, so I decided to go for a hike in the mountains. It was a bit challenging at times, but the views were absolutely stunning. I felt so grateful to be surrounded by nature and to have the opportunity to explore new trails. I also took some time to sit by a stream and just take in the sounds of the water and the birds. It was a peaceful and rejuvenating experience.'
    });

    const post8 = new Post({
        title: 'Making Time for Friends',
        body: 'I\'ve been feeling a bit isolated lately, so today I made a point to connect with some friends. We met up for brunch and caught up on each other\'s lives. It was so nice to have some good conversation and laughter. I sometimes forget how important it is to prioritize relationships and make time for the people who matter most. I feel so much more connected and supported after spending time with my friends today.'
    });

    const post9 = new Post({
        title: 'Trying a New Recipe',
        body: 'I love to cook, and today I decided to try out a new recipe for dinner. I made a Moroccan spiced chicken dish with couscous and roasted vegetables. It was a bit more involved than my usual weeknight meals, but it was so flavorful and satisfying. I\'m excited to add this recipe to my rotation and try out some other new dishes.'
    });

    const post10 = new Post({
        title: 'Celebrating a Milestone',
        body: 'Today marks one year since I started my new job, and it feels like such a significant milestone. It\'s been a challenging and rewarding year, full of growth and learning. I\'m so grateful for the opportunities and experiences that this job has given me, and for the amazing people I\'ve met along the way. I\'m excited to see what the next year will bring.'
    });

    const post11 = new Post({
        title: 'Overcoming Procrastination',
        body: 'I\'ve been putting off a big project for weeks, and today I finally forced myself to sit down and work on it. It wasn\'t easy to get started, but once I got into a flow, it felt really good to make progress. I\'m reminded that sometimes the hardest part is just getting started, and that breaking a big task into smaller, manageable chunks can make it feel less daunting.'
    });

    const post12 = new Post({
        title: 'Enjoying a Good Book',
        body: 'I\'ve been reading a lot lately, and today I finished a really great book. It was one of those books that you just can\'t put down, and I found myself staying up late to finish it. I love getting lost in a good story and feeling like I\'m transported to another world. Reading is such a great way to unwind and de-stress.'
    });

    const post13 = new Post({
        title: 'Reflecting on Gratitude',
        body: 'As the year draws to a close, I\'m taking some time to reflect on all the things I\'m grateful for. It\'s easy to get caught up in the stress and busyness of life, but there is so much to appreciate and cherish. I\'m grateful for my health, my relationships, my job, and so much more. Taking time to cultivate gratitude helps me to stay grounded and content, even in challenging times.'
    });

    // Save the posts to the database
    post1.save();
    post2.save();
    post3.save();
    post4.save();
    post5.save();
    post6.save();
    post7.save();
    post8.save();
    post9.save();
    post10.save();
    post11.save();
    post12.save();
    post13.save();
}

module.exports = postBlogs;