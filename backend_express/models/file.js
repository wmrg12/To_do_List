const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("file", FileSchema);