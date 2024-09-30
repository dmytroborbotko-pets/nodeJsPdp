const { Schema, model } = require("mongoose");

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Session", SessionSchema);
