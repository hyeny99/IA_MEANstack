const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    clients: {
        type: client,
        required: true,
    },

});

const Product = blogSchema;

module.exports = Product;