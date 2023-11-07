import mongoose from 'mongoose'
import config from '../../config/config'


mongoose.set('strictQuery', false)
mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})
