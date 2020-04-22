const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserItemSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    author: {type: mongoose.ObjectId }
  },
  {timestamps: true}
);


module.exports = UserItemSchema;
