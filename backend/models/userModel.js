const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    author: {type: mongoose.ObjectId },
    name: {type: String, trim: true, required: true},
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {type: String, required: true}
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = userSchema;
