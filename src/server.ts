import http from 'http'
import { createApp } from './app'
import { PORT } from './config'

const app = createApp()
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('Server has started!')
})