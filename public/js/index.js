var socket = io();

socket.on('listRooms', function(rooms) {
	console.log(rooms);
	var template = jQuery('#roomlist-template').html();
	for (var i = 0; i < rooms.length; i++) {
		var html = Mustache.render(template, {
			room: rooms[i].roomName
		});

		jQuery('#rooms').append(html);
	}
});

socket.on('addRoom', function(room) {
	console.log(room);
	var template = jQuery('#roomlist-template').html();
	var html = Mustache.render(template, {
		room: room
	});

	jQuery('#rooms').append(html);
});

socket.on('removeRoom', function(){
	console.log('room removed');
});
