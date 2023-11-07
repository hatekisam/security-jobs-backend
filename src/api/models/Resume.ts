import mongoose, { Schema, Document, Types } from "mongoose";

interface IResume extends Document {
  user: Types.ObjectId;
  link: string;
}

const schema = new Schema<IResume>(
  {
    user: { type: Schema.ObjectId, ref: "User", required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Resume = mongoose.model<IResume>("Resume", schema);

export default Resume;
