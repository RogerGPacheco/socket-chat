const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

io.on('connection', (socket) => {
    console.log('Novo usuário conectado!')

    socket.on('chat message', (data) =>{
        console.log(data)
        io.emit('chat message', {user: data.user, time: data.time, message: data.message});
    })
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    })
})

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})