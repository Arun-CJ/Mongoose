const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  post: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
postSchema.index({ post: 1, userId: 1 });

module.exports = mongoose.model("posts", postSchema);
