const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

TaskSchema.virtual("createdAt_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model("task", TaskSchema);