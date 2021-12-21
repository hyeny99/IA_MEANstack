const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientRanking: {
        type: Number,
        required: true,
    },
    items: {
        type: Number,
        required: true,
    },

});

const Client = blogSchema;

module.exports = Client;