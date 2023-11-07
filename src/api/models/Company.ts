import { Schema, model, Model, Document, Types } from "mongoose";

export interface ICompany {
  name: string;
  email: string;
  logo: string;
  about?: string;
  phone?: string;
  activated: boolean;
  users: Types.ObjectId[];
  awards: Types.ObjectId[];
  jobs: Types.ObjectId[];
  licenses: Types.ObjectId[];
}

export interface ICompanyMethods {
  toJsonWithoutPassword(): Partial<Document<ICompany>>;
}

type CompanyModel = Model<ICompany, Record<string, never>, ICompanyMethods>;

const schema = new Schema<ICompany, CompanyModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    activated: { type: Boolean, default: false },
    about: { type: String, required: false },
    logo: { type: String, required: false },
    phone: { type: String, unique: true },
    licenses: { type: [Schema.ObjectId], ref: "License" },
    jobs: { type: [Schema.ObjectId], ref: "Job" },
    awards: { type: [Schema.ObjectId], ref: "Award" },
    users: { type: [Schema.ObjectId], ref: "User" },
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

const Company = model<ICompany, CompanyModel>("Company", schema);

export default Company;
