import { Schema, model, Model, Document, Types } from "mongoose";

export interface IWorkExperience {
  title: string;
  company: string;
  description?: string;
  end: Date;
  start: Date;
  currentJob: boolean;
}

type WorkExperienceModel = Model<IWorkExperience, Record<string, never>>;

const schema = new Schema<IWorkExperience, WorkExperienceModel>(
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

const WorkExperience = model<IWorkExperience, WorkExperienceModel>(
  "WorkExperience",
  schema
);

export default WorkExperience;
