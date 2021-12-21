const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const RepoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  repos: [RepoSchema],
});

module.exports = model("Users", UserSchema);
