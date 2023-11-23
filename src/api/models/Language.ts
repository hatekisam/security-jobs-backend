import { Schema, model, Model } from "mongoose";

export interface ILanguage {
  name: string;
  oralLevel: number;
  writtenLevel: number;
}

type LanguageModel = Model<ILanguage, Record<string, never>>;

const schema = new Schema<ILanguage, LanguageModel>(
  {
    name: { type: String, required: true },
    oralLevel: { type: Number, required: true },
    writtenLevel: { type: Number, required: true },
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

const Language = model<ILanguage, LanguageModel>("Language", schema);

export default Language;
