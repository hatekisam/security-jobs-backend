import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import './api/db'
import routes from './api/routes'
import errorHandler from './api/middlewares/errorHandler'
import notFoundHandler from './api/middlewares/notFoundHandler'
import tokenGetter from './api/middlewares/tokenGetter'
import config from './config/config'
import morgan from 'morgan'
import cookieParser from "cookie-parser"

const app = express()


app.use(
	cors({
		origin: '*',
	})
)
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
)
app.use(cookieParser())
app.use(compression())
app.use(express.json())
app.use(tokenGetter)

if (config.ENV === 'development') {
	morgan.token('body', (req: any) => {
		return JSON.stringify(req.body)
	})

	app.use(
		morgan(
			':method :url :status :body :res[content-length] - :response-time ms'
		)
	)
}

app.get('/health', (_, res) => {
	res.status(200).send('ok')
})

app.use('/api/v1', routes)
app.use(errorHandler)
app.use(notFoundHandler)
export default app
