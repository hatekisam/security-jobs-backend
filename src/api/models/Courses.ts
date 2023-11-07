import { Schema, model, Document, SchemaTypes } from 'mongoose';



const schema = new Schema(
        {
                name: {
                        type: String,
                        required: true,
                },
                topics: {
                        type: [Schema.ObjectId],
                        ref:'Topic',
                },
                description: {
                        type: String,
                        required: true,
                },
                reviews: {
                        type: [Schema.ObjectId],
                        ref:'CourseReview',
                },
        },
        {
                timestamps: true,
        }
);

const Course = model('Course', schema);

export default Course;
