import mongoose, { Schema, Document } from 'mongoose'
import { TokenType, TokenTypeEnum } from '../interfaces/Token'

interface IToken extends Document {
	email: string
	token: string
	type: TokenType
	expireAt: Date
}

const schema = new Schema<IToken>(
	{
		email: String,
		token: String,
		expireAt: {
			type: Date,
			expires: 3600,
		},
		type: {
			type: String,
			enum: TokenTypeEnum,
			default: 'PASSWORD_RESET',
		},
	},
	{
		timestamps: true,
	}
)

schema.set('toJSON', {
	transform: (_document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Token = mongoose.model<IToken>('Token', schema)

export default Token
