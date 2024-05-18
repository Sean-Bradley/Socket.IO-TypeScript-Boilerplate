// When starting this project by using `npm run dev`, this server script
// will be compiled using tsc and will be running concurrently along side webpack-dev-server
// visit http://127.0.0.1:8080

// In the production environment we don't use the webpack-dev-server, so instead type,
// `npm run build`        (this creates the production version of bundle.js and places it in ./dist/client/)
// `tsc -p ./src/server`  (this compiles ./src/server/server.ts into ./dist/server/server.js)
// `npm start            (this starts nodejs with express and serves the ./dist/client folder)
// visit http://127.0.0.1:3000

import express from 'express'
import path from 'path'
import http from 'http'
import { Server, Socket } from 'socket.io'

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    private io: Server

    constructor(port: number) {
        this.port = port

        const app = express()
        app.use(express.static(path.join(__dirname, '../client/')))

        this.server = new http.Server(app)

        this.io = new Server(this.server)

        this.io.on('connection', (socket: Socket) => {
            console.log('a user connected : ' + socket.id)

            socket.emit('message', 'Hello ' + socket.id)

            socket.on('disconnect', function () {
                console.log('socket disconnected : ' + socket.id)
            })

            socket.on('message', function (message: any) {
                console.log(message)
            })
        })

        setInterval(() => {
            let randomNumber = Math.floor(Math.random() * 10)
            this.io.emit('random', randomNumber)
        }, 1000)
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log(`Socket.IO listening on port ${this.port}.`)
        })
    }
}

new App(port).Start()