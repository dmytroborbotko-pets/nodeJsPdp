const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["private", "public"], required: true },
  },
  { timestamps: true }
);
