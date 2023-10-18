const { Thought, User } = require("../models");

module.exports = {
    // get all thought
    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.studentId }).select('-__v');
    }

}