const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, require: true },
    body: { type: String, require: true },
    device: { type: String, require: true },
    author: { type: String, require: true },
    authorId: { type: String, require: true },

}, {
    versionKey: false
})

const PostModel = mongoose.model("user", PostSchema)

module.exports = {
    PostModel,
}