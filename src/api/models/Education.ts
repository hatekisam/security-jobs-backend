import { Schema, model, Model } from "mongoose";

export interface IEducation {
  title: string;
  company: string;
  description?: string;
  end: Date;
  start: Date;
  currentJob: boolean;
}

type EductionModel = Model<IEducation, Record<string, never>>;

const schema = new Schema<IEducation, EductionModel>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    end: { type: Date, required: true },
    start: { type: Date, required: true },
    description: { type: String, required: false },
    currentJob: { type: Boolean, required: true },
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

const Education = model<IEducation, EductionModel>(
  "Education",
  schema
);

export default Education;
