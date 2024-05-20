// When starting this project by using `npm run dev`, this server script
// will be compiled using tsc and will be running concurrently along side webpack-dev-server
// visit http://127.0.0.1:8080

// In the production environment we don't use the webpack-dev-server, so instead type,
// `npm run build`        (this creates the production version of bundle.js and places it in ./dist/client/)
// `tsc -p ./src/server`  (this compiles ./src/server/server.ts into ./dist/server/server.js)
// `npm start            (this starts nodejs with express and serves the ./dist/client folder)
// visit http://127.0.0.1:3000

import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import * as express from 'express'
import * as path from 'path'

const port = 3000

const app = express()
app.use(express.static(path.join(__dirname, '../client')))

const server = createServer(app)

const io = new Server(server)

io.on('connection', (socket: Socket) => {
  console.log('a user connected : ' + socket.id)
})

server.listen(port, () => {
  console.log('Server listening on port ' + port)
})
