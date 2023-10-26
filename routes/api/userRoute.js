const router = require("express").Router();

const {
    getUsers, 
    getSingleUser, 
    createUser, 
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
 
} = require('../../controllers/userController.js');

// api/User route
router.route("/").get(getUsers).post(createUser);

// /api/User/:userId
router.route('/:userId').get(getSingleUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);

// /api/User/:userId/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;