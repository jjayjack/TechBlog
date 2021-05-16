const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const auth = require('../../utils/auth')

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{model:User}]
    });
    // Serialize user data so templates can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data into Handlebars.js template
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', auth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {user_id: req.session.user_id}});
    

    const prevPosts = userPosts.map((post) => post.get({ plain: true }));
    try{
        res.render('dashboard',
          {
             logged_in: req.session.logged_in,
             posts: prevPosts,
          });
        }catch (err) {
          res.status(500).json(err)
        } 
  } catch (err) {
  res.status(500).json(err);
  console.log(err)
}
});

router.get('/dashboard/create', auth, async (req, res) => {
  try {
    res.render('create', {
      logged_in: req.session.logged_in
    });
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/dashboard/:id', auth, async (req, res) => {
  const prevPosts = await Post.findByPk(req.params.id);
  if (prevPosts.dataValues.user_id == req.session.user_id) {
    try {
      res.render('edit', {
        post: prevPosts.dataValues, logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.redirect('/dashboard');
  }
});

router.get('/post/:id', auth, async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [{model:User}, {model: Comment, include: [{model: User}]}]
  });
  try {
    res.render('post', {
      post:post.dataValues, logged_in: req.session.logged_in
    });
  }catch(err){
    res.status(500).json(err)
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
