const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, trim: true, required: true},
    email: {type: String, trim: true,  unique: true, required: true},
    password: {type: String, required: true},
    author: {type: mongoose.ObjectId }
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = userSchema;
