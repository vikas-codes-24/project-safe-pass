const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
  {
    siteUrl: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);
const pass = mongoose.model("password", passwordSchema);
module.exports = { pass };
