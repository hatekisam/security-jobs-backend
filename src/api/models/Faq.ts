import { Schema, model } from 'mongoose';


export interface IFaq {
        question: string;
        answer: string;
        category: string;
}

const schema = new Schema<IFaq>(
        {
                question: {
                        type: String,
                        required: true,
                },
                answer: {
                        type: String,
                        required: true,
                },
                category: {
                        type: String,
                        required: true,
                },
        },
        {
                timestamps: true
        }
);

schema.set('toJSON', {
        transform: (_document: any, returnedObject: any) => {
                returnedObject.id = returnedObject._id.toString()
                delete returnedObject._id
                delete returnedObject.__v
        },
})

const Faq = model<IFaq>('Faqs', schema);

export default Faq
