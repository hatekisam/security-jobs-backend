import http from 'http'
import app from './app'
import config from './config/config'
import { Server } from 'socket.io'
import ioHelper from './api/helpers/socket'

const server = http.createServer(app)

const io = new Server(server, {
	transports: ['polling'],
	cors: { origin: '*' },
})

ioHelper(io)

server.listen(config.PORT, () =>
	console.log(`Running on port http://localhost:${config.PORT}`)
)
