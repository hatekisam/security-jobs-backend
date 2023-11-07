import { model, Schema, Types } from 'mongoose'

export interface INotification {
	title: string
	summary: string
	body: string
	recipient: Types.ObjectId
	read: boolean
}

const schema = new Schema<INotification>({
	title: { type: String, required: true },
	summary: { type: String, required: true },
	body: { type: String, required: true },
	recipient: { type: Schema.ObjectId, ref: 'User', required: true },
	read: { type: Boolean, default: false },
})

schema.index({
	title: 'text',
	summary: 'text',
	body: 'text',
})

schema.set('toJSON', {
	transform: (_document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Notification = model<INotification>('Notification', schema)

export default Notification
