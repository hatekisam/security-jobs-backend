import { Schema, model, Document, SchemaTypes } from "mongoose";

const schema = new Schema(
  {
    reviewer: {
      type: Schema.ObjectId,
      required: true,
      ref: "Account",
    },
    company: {
      type: Schema.ObjectId,
      required: false,
      ref: "Company",
    },
    user: {
      type: Schema.ObjectId,
      required: false,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", schema);

export default Review;
