import { Schema, model, Model, Document, Types } from "mongoose";

export interface IUser {
  username: string;
  profile: string;
  about?: string;
  workExperience: Types.ObjectId[];
  education: Types.ObjectId[];
  skills: string[];
  languages: Types.ObjectId[];
  awards: Types.ObjectId[];
  resume: Types.ObjectId[];
  dob: Date;
  gender: "MALE" | "FEMALE";
  location: string;
}

export interface IUserMethods {
  toJsonWithoutPassword(): Partial<Document<IUser>>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const schema = new Schema<IUser, UserModel>(
  {
    username: { type: String, required: true },
    about: { type: String, required: false },
    profile: { type: String, required: false },
    workExperience: [{ type: Schema.ObjectId, ref: "Work" }],
  },
  {
    timestamps: true,
  }
);

schema.index({
  name: "text",
  email: "text",
});

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

schema.method("toJsonWithoutPassword", function toJsonWithoutPassword() {
  const userObject: any = this.toJSON();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = userObject;
  return userWithoutPassword;
});

schema.virtual("role").get(function () {
  return "USER";
});

const User = model<IUser, UserModel>("User", schema);

export default User;
