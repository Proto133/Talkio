 const router = require('express').Router();

 const userRoutes = require('./userRoutes');
 const postRoutes = require('./postRoutes');
 const commentRoutes = require('./commentRoutes');
 const miscRoutes = require('./miscRoutes');

 router.use('/users', userRoutes);
 router.use('/posts', postRoutes);
 router.use('/comments', commentRoutes);


 module.exports = router;