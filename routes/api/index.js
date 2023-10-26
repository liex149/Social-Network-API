const router = require('express').Router();
// const thoughtRoutes = require('./thoughtRoute');
const userRoutes = require('./userRoute');

// router.use('/Thought', thoughtRoutes);
router.use('/User', userRoutes);

module.exports = router;