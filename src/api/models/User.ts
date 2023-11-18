import { Schema, model, Model, Document, Types } from "mongoose";

export interface IUser {
  username: string;
  profile: string;
  about?: string;
  workExperience: Types.ObjectId[];
  education: Types.ObjectId[];
  skills: Types.ObjectId[];
  languages: Types.ObjectId[];
  awards: Types.ObjectId[];
  files: Types.ObjectId[];
  dob: Date;
  gender: "MALE" | "FEMALE" | "NONE";
  location: string;
}

type UserModel = Model<IUser, Record<string, never>>;

const schema = new Schema<IUser, UserModel>(
  {
    username: { type: String, required: true },
    about: { type: String, required: false },
    profile: { type: String, required: false },
    location: { type: String },
    dob: { type: Date },
    workExperience: [{ type: Schema.ObjectId, ref: "Work" }],
    awards: [{ type: Schema.ObjectId, ref: "Award" }],
    languages: [{ type: Schema.ObjectId, ref: "Language" }],
    education: [{ type: Schema.ObjectId, ref: "Education" }],
    files: [{ type: Schema.ObjectId, ref: "Work" }],
    skills: [{ type: Schema.ObjectId, ref: "Skills" }],
    gender: { type: String, default: "NONE" },
  },
  {
    timestamps: true,
  }
);

schema.index({
  username: "text",
});

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

schema.virtual("role").get(function () {
  return "USER";
});

const User = model<IUser, UserModel>("User", schema);

export default User;
