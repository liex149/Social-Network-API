const { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // create user
  async createUser(req, res) {
    try {
      const userCreate = await User.create(req.body);
      res.json(userCreate);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update user
  async updateUser(req, res) {
    try {
      const userUpdate = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userUpdate) {
        return res.status(404).json({ message: 'No User with this id!' });
      }

      res.json(userUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' });
      }

      await User.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add friend
  async addFriend(req, res) {
    try {
      console.log('You are adding a Friend');
      console.log(req.body);
      const addingFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!addingFriend) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' })
      }

      res.json(addingFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete friend
  async deleteFriend(req, res) {
    try {
      const byeFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!byeFriend) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' });
      }

      res.json(byeFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

}; 