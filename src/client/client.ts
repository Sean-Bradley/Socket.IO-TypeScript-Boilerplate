import { io } from 'socket.io-client'

class Client {
    socket = io()

    constructor() {
        this.socket.on('connect', function () {
            console.log('connect')
            document.body.innerHTML = ''
        })

        this.socket.on('disconnect', function (message: any) {
            // If the socket is closed for some reason.
            console.log('disconnect ' + message)
            document.body.innerHTML = 'Disconnected from Server'
        })

        this.socket.on('message', (message: any) => {
            console.log(message)
            document.body.innerHTML = message + '<br/>' + document.body.innerHTML

            // Sending an optional reply back to the server
            this.socket.emit('message', 'Thanks, I got your message.')
        })

        this.socket.on('random', function (message: any) {
            // The server sends a random number to all connected clients once a second
            console.log(message)
            document.body.innerHTML = message + '<br/>' + document.body.innerHTML
        })
    }
}

const client = new Client()
