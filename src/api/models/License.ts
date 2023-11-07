import mongoose, { Schema, Document, Types } from "mongoose";

interface ILicense extends Document {
  user: Types.ObjectId;
  link: string;
}

const schema = new Schema<ILicense>(
  {
    user: { type: Schema.ObjectId, ref: "Company", required: true },
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

const License = mongoose.model<ILicense>("License", schema);

export default License;
