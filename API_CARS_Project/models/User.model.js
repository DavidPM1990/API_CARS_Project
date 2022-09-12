const { Schema, model } = require("mongoose");
const { ROLES, USER } = require('../const/user.const')
// const bcrypt = require('bcryptjs');
// const SALT = +process.env.SALT;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 8 },
    profileImg: { type: String },
    description: { type: String, default: 'Description doesn`t exist!' },
    role: {
      type: String,
      required: true,
      enum: ROLES,
      default: USER
    }
  },
  {

    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = User;
