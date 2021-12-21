const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    sid: {
        type: String,
        required: true,
    },
    products: {
        type: Product,
        required: true,
    },

});

const Blog = mongoose.model('EvaluationRecords', blogSchema);

module.exports = Blog;