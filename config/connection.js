const { connect, connection, mongo } = require('mongoose');

connect('mongodb://127.0.0.1:27017/SocialDB');

module.exports = connection;