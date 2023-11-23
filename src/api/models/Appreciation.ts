import { Schema, model, Model } from "mongoose";

export interface IAppreciation {
  name: string;
  achievement: string;
  date: Date;
  description?: string;
}

type AppreciationModel = Model<IAppreciation, Record<string, never>>;

const schema = new Schema<IAppreciation, AppreciationModel>(
  {
    name: { type: String, required: true },
    achievement: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: false },
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

const Appreciation = model<IAppreciation, AppreciationModel>("Appreciation", schema);

export default Appreciation;
