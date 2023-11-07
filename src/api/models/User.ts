import { Schema, model, Model, Document, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  username: string;
  profile: string;
  about?: string;
  phone?: string;
  theme: "dark" | "light";
  activated: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  courses: Types.ObjectId[];
  coursesLevel: Types.ObjectId[];
}

export interface IUserMethods {
  toJsonWithoutPassword(): Partial<Document<IUser>>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const schema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    about: { type: String, required: false },
    profile: { type: String, required: false },
    phone: { type: String, unique: true },
    theme: { type: String, default: "dark" },
    phoneVerified: { type: Boolean, default: false },
    coursesLevel: { type: [Schema.ObjectId], ref: "UserCourse" },
    courses: { type: [Schema.ObjectId], ref: "Course" },
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
