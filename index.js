const express = require('express');
const http = require('http');
const cors = require('cors');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');
const PORT = process.env.PORT || 5000;

const router = require('./router.js')

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server)
// , {
//     cors: {
//       origin: `http://localhost:${PORT}`,
//       methods: ["GET", "POST"],
//       credentials: true
//     }
//   });

io.on('connection', (socket) => {
    console.log("We got new connection");
    
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name: name, room: room});

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `Hey ${user.name}! Welcome to room ${user.room}!` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} joined chat!` });

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message});
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left!`});
        }
    });
})

app.use(router);
app.use(cors());

server.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
})