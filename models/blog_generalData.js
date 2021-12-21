const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    sid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
});

const Blog = mongoose.model('generalData', blogSchema);

module.exports = Blog;