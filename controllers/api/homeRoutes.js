const router = require('express').Router();
const { User, Post } = require('../../models');
const auth = require('../../utils/auth')

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    // Serialize user data so templates can read it
    const posts = postData.map((project) => project.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', auth, async (req, res) => {
  try {
    const userPosts = [];
    //want to connect post user_id with logged in user_id to render all posts made by user
    Post.findAll({ where: { user_id: user_id } })
      .then(userPostsList => {
        res.render('dashboard',
          {
            userPostsList, logged_in: req.session.logged_in,
          });
      }
      )
    //   function(usePostsArr) {
    // const userPostsList = userPosts.map((posts) => posts.get({ plain: true }))
    
  } catch (err) {
  res.status(500).json(err);
  console.log(err)
}
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
})

router.get('/signup', async (req, res) => {
  res.render('signup')
});



module.exports = router;
