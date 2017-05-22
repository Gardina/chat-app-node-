const {Users} = require('./users.js');

class Rooms {
	constructor() {
		this.rooms = [];
	}
	addRoom (id, roomName) {
		var room = {roomName, id, users: 0};
		this.rooms.push(room);
		return room;
	}
	addUserRoom (roomName) {
		var room = this.getRoomByName(roomName);
		if (room){
			room.users += 1;
		}
		return room;
	}
	removeRoom (id) {
		var room =this.getRoom(id);
		if (room) {
			this.rooms = this.rooms.filter((existingRoom) => existingRoom !== room);
		}
		return room;
	}
	removeUserRoom (roomName) {
		var room = this.getRoomByName(roomName);
		if (room) {
			room.users -=1;
		}
		return room;
	}
	getRoom (id) {
		return this.rooms.filter((room) => room.id === id)[0];
	}
	getRoomByName (roomName) {
		return this.rooms.filter((room) => room.roomName === roomName)[0];
	}
}

module.exports = {Rooms};
