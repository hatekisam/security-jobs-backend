import { Schema, model, Document, SchemaTypes } from 'mongoose';



const schema = new Schema(
        {
                reviewer: {
                        type: Schema.ObjectId,
                        required: true,
                        ref: 'User'
                },
                rating: {
                        type: Number,
                        required: true
                },
                content: {
                        type: String,
                        required: true,
                }

        },
        {
                timestamps: true,
        }
);

const CourseReview = model('CourseReview', schema);

export default CourseReview;
