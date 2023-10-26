const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single Thought
  async getSingleThought(req, res) {
    try {
      const singThought = await Thought.findOne({ _id: req.params.thoughtId });
       

      if (!singThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(singThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create thought
  async createThought(req, res) {
    try {
      const thoughtCreate = await Thought.create(req.body);

      
const thoughtForUser = await User.findByIdAndUpdate(        
        { _id: req.body.userId },
        { $addToSet: {thoughts: thoughtCreate._id }},
        { runValidators: true, new: true });
     
      res.json(thoughtCreate);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // update thought
  async updateThought(req, res) {
    try {
      const ThoughtUpdate = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!ThoughtUpdate) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(ThoughtUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // delete thought
  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!deleteThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      return res.status(200).json({
        message: "Thought successfully deleted",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Add a reaction stored in a single thought
async addReaction(req, res) {
  try {
    const addReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$addToSet: {reactions: { reactionBody: req.body.reactionBody, username: req.body.username}}},
      { runValidators: true }
    );

    if (!addReaction) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    return res.status(200).json(addReaction);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

// delete reaction
async deleteReaction(req, res) {
  try {
    const reactionDeleted = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!reactionDeleted) {
      return res
        .status(404)
        .json({ message: "No reaction with that ID" });
    }
    return res.status(200).json({
      message: "Reaction successfully deleted",
    });
    return res.status(200).json(reactionDeleted);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},
}; 