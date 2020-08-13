const mongoose = require("mongoose");

const stuffSchema = new mongoose.Schema(
  {
    head: String,
    body: String,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stuff", stuffSchema);
