const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = ArticleItemSchema;