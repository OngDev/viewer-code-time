const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const DurationSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Durations", DurationSchema);
