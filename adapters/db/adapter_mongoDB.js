const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/usersdb';

const connect = () => {
    mongoose.connect(dbUrl)
}

module.exports = connect;