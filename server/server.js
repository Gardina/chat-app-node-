const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit('newMessage', {
		from: 'tolyan',
		text: 'hey whats up',
		createdAt: 123456790
	});

	socket.on('createMessage', (message) => {
		console.log('new message', message);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});
