const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostItemSchema = new Schema({
    title: {type: String, required: true},
    image: {data: Buffer, contentType: String},
    content: {type: String, required: true},
    author: {type: mongoose.ObjectId }
  },
  {timestamps: true}
);


module.exports = PostItemSchema;
