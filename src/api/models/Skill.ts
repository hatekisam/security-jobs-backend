import { Schema, model, Model } from "mongoose";

export interface ISkill {
  title: string;
  description?: string;
}

type SkillModel = Model<ISkill, Record<string, never>>;

const schema = new Schema<ISkill, SkillModel>(
  {
    title: { type: String, required: true },
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

const Skill = model<ISkill, SkillModel>("Skill", schema);

export default Skill;
