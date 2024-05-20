import { io } from 'socket.io-client'

const socket = io()

socket.on('connect', () => {
  document.body.innerText = 'Connected : ' + socket.id
})
