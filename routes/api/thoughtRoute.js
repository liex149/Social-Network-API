const router = require('express').Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');


// // /api/Thought
router.route('/').get(getThought).post(createThought);

// /api/Thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought);

// // /api/Thought/:thoughtId/Reactions
router.route('/:thoughtId/Reactions').post(addReaction);
router.route('/:thoughtId/Reactions/:reactionId').delete(deleteReaction)

module.exports = router;