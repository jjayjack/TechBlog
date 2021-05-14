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
  res.render('dashboard', {
    logged_in: req.session.logged_in,
  })
}
);

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
