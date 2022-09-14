const { Schema, model } = require("mongoose");
const { ROLES, USER, GUEST } = require('../const/user.const')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 8 },
    profileImg: { type: String, default: 'https://picsum.photos/200' },

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



const userModel = model("user", userSchema);

module.exports = userModel;
