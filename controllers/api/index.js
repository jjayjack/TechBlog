const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes.js');
const homeRoutes = require('./homeRoutes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/', homeRoutes);


module.exports = router;
