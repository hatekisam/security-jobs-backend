import { Faq } from "../models"

const createFaq = async (body: {
        question: string
        answer: string
        category: string
}) => {
        const faq = new Faq(body)

        return await faq.save()
}

const getFaqById = async (id: string) => {
        return Faq.findById(id).exec()
}

const getAllFaqs = async () => {
        return Faq.find({}).exec()
}


const updateFaq = (id: string, body: Partial<{
        question: string;
        answer: string;
        category: string;
}>) => {
        return Faq.findByIdAndUpdate(id, { ...body }, { new: true })
}

const deleteFaq = async (id: string) => {
        await Faq.findByIdAndDelete(id, { deleted: true })
}


export default {
        getFaqById,
        getAllFaqs,
        createFaq,
        updateFaq,
        deleteFaq
}