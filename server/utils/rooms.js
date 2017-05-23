class Rooms {
	constructor() {
		this.rooms = [];
	}
	createRoom (roomName) {
		var room = {
			roomName,
			users: 1
		};
		this.rooms.push(room);
		return room;
	}
	removeRoom (roomName) {
		var room =this.getRoom(roomName);
		if (room) {
			this.rooms = this.rooms.filter((existingRoom) => existingRoom.roomName !== room.roomName);
		}
		return room;
	}
	removeOne (roomName) {
		var room = this.getRoom(roomName);
		room.users -= 1;
		return room;
	}
	addOne (roomName){
		var room = this.getRoom(roomName);
		room.users += 1;
		return room;
	}
	getRoom (roomName) {
		return this.rooms.filter((room) => room.roomName === roomName)[0];
	}
}

module.exports = {Rooms};
