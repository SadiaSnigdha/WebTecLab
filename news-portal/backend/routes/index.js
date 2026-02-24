const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const newsRoutes = require('./newsRoutes');
const commentRoutes = require('./commentRoutes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'News Portal API is running',
    version: '1.0.0'
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/news', newsRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
