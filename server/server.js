const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, isUniqueUser, isNewRoom} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

	socket.emit('listRooms', rooms.rooms);

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required.');
		}

		if (!isUniqueUser(users.users, params.name, params.room)) {
			return callback(`${params.name} is already taken`);
		}

		socket.join(params.room);

		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		if (!rooms.getRoom(params.room)) {
			rooms.createRoom(params.room);
			socket.emit('createRoom', params.room);
		} else {
			rooms.addOne(params.room);
		}

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', `Welcome to chat ${params.name}`));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();
	});

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);

		if(user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}

	});

	socket.on('disconnect', () => {
		var user = users.getUser(socket.id);
		console.log(user);
		users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
			var roomName = user.room;
			var room = rooms.getRoom(roomName);
			if (room) {
				if (room.users <= 1) {
					rooms.removeRoom(roomName);
					socket.emit('removeRoom', room);
				} else {
					rooms.removeOne(roomName);
				}
			}
		} else {
			users.addUser(socket.id);
		}
	});
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});
