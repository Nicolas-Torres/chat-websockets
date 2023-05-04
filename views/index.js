//* FRONTEND

const socket = io.connect()
// console.log(socket)

//* RECEPCION DE MENSAJES
const render = (data) => {
    const html = data.map(msg => `
    <li class="clearfix">
    <div class="message-data">
      <span class="message-data-time">${msg.autor}</span>
    </div>
    <div class="message my-message">${msg.msg}</div>
   </li>`).join(" ")

//    console.log(html)
   document.getElementById('mensajes').innerHTML = html
}

socket.on('mensajes', data => {
    console.log(data)
    render(data)
})


//* ENVIO DE MENSAJES

const enviarMensaje = (event) => {
    const nombre = document.getElementById('nombre').value
    const msg = document.getElementById('chat_mensaje').value
    document.getElementById('chat_mensaje').value = ''

    socket.emit('new_msg', {autor: nombre, msg: msg})
    return false

}













