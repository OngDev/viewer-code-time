const mongoose = require("mongoose");
const moment = require("moment");

const { Schema, model } = mongoose;

const DurationSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: moment(new Date()).format(),
  },
});

module.exports = model("Durations", DurationSchema);
