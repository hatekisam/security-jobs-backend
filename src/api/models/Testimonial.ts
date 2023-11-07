import { Schema, model, Document, SchemaTypes } from 'mongoose';



const schema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		occupation: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},

	},
	{
		timestamps: true,
	}
);

const Testimonial = model('Testimonial', schema);

export default Testimonial;
