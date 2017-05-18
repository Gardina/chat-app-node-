var socket = io();

socket.on('connect', function() {
	console.log(
    'connected to sever'
  );

	socket.emit('createMessage', {
		from: 'Kolyan',
		text: 'halo'
	});
});

socket.on('disconnect', function () {
	console.log('disconnected from server ');
});

socket.on('newMessage', function (message) {
	console.log('you have new message', message);
});
