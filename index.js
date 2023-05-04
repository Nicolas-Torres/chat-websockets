
const express = require('express')
const { Server: HTTPServer } = require('http')
const { Server: SocketServer } = require('socket.io')

//* Servidor express
const app = express()
const PORT = process.env.PORT || 8082

const httpServer = new HTTPServer(app)

const io = new SocketServer(httpServer)

const mensajes = [
    {
        autor: 'Jose',
        msg: 'hola'
    },
    {
        autor: 'Pedro',
         msg: 'hola a todos'
    }
]


app.use(express.static('views'))

//! const socket = usuario unico especifico
//! io.sockets = todos los usuarios conectados


io.on('connection', socket => {
    console.log(`Conectado: ${socket.id}`)
    socket.emit('mensajes', mensajes)

    socket.on('new_msg', data => {
        console.log(data)
        mensajes.push(data)

        //! evento general para todos los usuarios (sockets)
        io.sockets.emit('mensajes', mensajes)
    })

})





const server = httpServer.listen(PORT, () => {
    console.log(`Server express con Websockets iniciado - PORT: ${PORT}`)
})

server.on('error', err => {
    console.log(err.message)
})