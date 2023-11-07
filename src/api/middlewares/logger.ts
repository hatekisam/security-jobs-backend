/* eslint-disable @typescript-eslint/no-explicit-any, no-console, @typescript-eslint/explicit-module-boundary-types */
import config from '../../config/config'

const info = (...params: any): void => {
	if (config.ENV !== 'test') {
		console.log(...params)
	}
}

const error = (...params: any): void => {
	console.log(...params)
}

export default {
	info,
	error,
}
