import { Schema, model } from 'mongoose';



const schema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        course: {
            type: Schema.ObjectId,
            required: true,
            ref: 'Course'
        },
        topic: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const UserCourse = model('UserCourse', schema);

export default UserCourse;
