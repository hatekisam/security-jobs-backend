import { Schema, model, Model, Document } from "mongoose";
import { AdminRole, AdminRoleEnum } from "../interfaces/Admin";

export interface IAdmin {
  name: string;
  email: string;
  password: string;
  phone: string;
  suspended: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: AdminRole;
}

export interface IAdminMethods {
  toJsonWithoutPassword(): Partial<Document<IAdmin>>;
}

type Admin = Model<IAdmin, Record<string, never>, IAdminMethods>;

const schema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: AdminRoleEnum,
      default: "FACILITATOR",
    },
    email: { type: String, required: true, lowercase: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    phoneVerified: { type: Boolean, default: false },
    suspended: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

schema.index({ firstName: "text", lastName: "text", email: "text" });

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

schema.method("toJsonWithoutPassword", function toJsonWithoutPassword() {
  const adminObject: any = this.toJSON();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...adminWithoutPassword } = adminObject;
  return adminWithoutPassword;
});

const Admin = model<IAdmin, Admin>("Admin", schema);

export default Admin;
