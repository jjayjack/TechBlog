const router = require('express').Router();
const { User, Post } = require('../../models');
const auth = require('../../utils/auth')

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    // Serialize user data so templates can read it
    const posts = postData.map((project) => project.get({ plain: true }));
    console.log("at posts")

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', auth, async (req, res) => {
  res.render('dashboard')}
);

router.get('/login', async (req, res) =>{
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
})



module.exports = router;
