import express, { Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const router = express.Router()

const swaggerOptions: swaggerJSDoc.Options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'LA-academy API ',
			version: '1.0.0',
		},	
		components: {
			securitySchemas: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
	apis: ['src/*.ts', 'src/api/routes/**/*.ts'],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

router.use('/', swaggerUi.serve)

router.get(
	'/',
	swaggerUi.setup(swaggerDocs, {
		explorer: true,
	})
)

router.get('/swagger.json', (_: Request, res: Response) => {
	res.json(swaggerDocs)
})

export default router
