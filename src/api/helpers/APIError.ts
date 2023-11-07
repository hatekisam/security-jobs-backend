class ApiError extends Error {
	statusCode: number

	constructor(statusCode: number, message: string, stack = '') {
		super(message)
		this.statusCode = statusCode || 500
		this.name = this.constructor.name

		Object.setPrototypeOf(this, new.target.prototype)

		if (stack) {
			this.stack = ''
		} else {
			Error.captureStackTrace(this, this.constructor)
		}
	}
}

export default ApiError
