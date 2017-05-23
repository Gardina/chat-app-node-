class Rooms {
	constructor() {
		this.rooms = [];
	}
	createRoom (id, roomName) {
		var room = {
			sockets: [id],
			roomName
		};
		this.rooms.push(room);
		return room;
	}
	addSocket (id, roomName) {
		var room = this.getRoomByName(roomName);
		room.sockets.push(id);
		return room;
	}
	removeRoom (id) {
		var room =this.getRoom(id);
		if (room) {
			this.rooms = this.rooms.filter((existingRoom) => existingRoom.roomName !== room.roomName);
		}
		return room;
	}
	removeSocket (id, roomName) {
		var room = this.getRoomByName(roomName);
		var i = room.sockets.indexOf(id);
		room.sockets.splice(i, 1);
		return room;
	}
	getRoom (id) {
		function checkId (room) {
			if (room.sockets.indexOf(id) === -1){
				return false;
			} else {
				return true; }
		}
		return this.rooms.filter(checkId)[0];
	}
	getRoomByName (roomName) {
		return this.rooms.filter((room) => room.roomName === roomName)[0];
	}
}

module.exports = {Rooms};
