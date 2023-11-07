import { Course, CourseReview, Topic, User, UserCourse } from '../models'

const createCourse = async (body: {
	name: string
	description: string
	topics: string[]
}) => {
	let allTopics = []
	for (let i = 0; i < body.topics.length; i++) {
		const topic = new Topic({ name: body.topics[i] })
		await topic.save()
		allTopics.push(topic._id)
	}
	const course = new Course({
		topics: allTopics,
		name: body.name,
		description: body.description
	})
	return await course.save()
}

const addDataToTopics = async (id: any, body: any) => {
	const topic = await Topic.findByIdAndUpdate(id, body)
	return topic;
}

const reviewCourse = async (id: string, body: any, reviewer: any) => {
	const review = new CourseReview({
		reviewer,
		...body
	})
	await Course.findByIdAndUpdate(id, { $push: { reviews: review } }, { new: true })
}

const takeCourse = async (id: string, user: string) => {
	const course = await Course.findById(id)
	const userCourse = new UserCourse({
		course: course?._id,
		topic: 0,
		user
	})
	await userCourse.save()
	await User.findByIdAndUpdate(user, { $push: { courses: course, coursesLevel: userCourse._id } })
}

const getCourseById = async (id: string) => {
	return Course.findById(id).populate("topics")
}

const getAllCourses = async () => {
	return Course.find({}).exec()
}
const updateCourse = (id: string, body: Partial<{
	name?: string
	description?: string
}>) => {
	return Course.findByIdAndUpdate(id, { ...body }, { new: true })
}

const deleteCourse = async (id: string) => {
	await Course.findByIdAndDelete(id)
}
export default {
	getCourseById,
	getAllCourses,
	createCourse,
	updateCourse,
	deleteCourse,
	addDataToTopics,
	reviewCourse,
	takeCourse
}
