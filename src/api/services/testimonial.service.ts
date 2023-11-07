import mongoose from "mongoose";
import { Testimonial } from "../models";


const createTestimonial = async (body: {
        firstName: string;
        lastName: string;
        occupation: string;
        content: string;
}) => {
        const testimonial = new Testimonial(body)
        return await testimonial.save()
}

const getTestimonialById = async (id: string) => {
        return Testimonial.findById(id).exec()
}

const getAllTestimonials = async () => {
        return Testimonial.find({}).exec()
}


const updateTestimonial = (id: string, body: Partial<{
        firstName: string;
        lastName: string;
        occupation: string;
        content: string;
}>) => {
        return Testimonial.findByIdAndUpdate(id, { ...body }, { new: true })
}

const deleteTestimonial = async (id: string) => {
        await Testimonial.findByIdAndDelete(id, { deleted: true })
}


export default {
        getTestimonialById,
        getAllTestimonials,
        createTestimonial,
        updateTestimonial,
        deleteTestimonial
}