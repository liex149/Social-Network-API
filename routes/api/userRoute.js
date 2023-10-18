const router = require("express").Router();

const {
    getUser, 
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// api user route
router.route("/").get(getUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);

// /api/users/:userId/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;