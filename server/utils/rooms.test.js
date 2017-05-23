const expect = require('expect');
const {Rooms} = require('./rooms.js');

describe('Rooms', () => {
	var rooms;

	beforeEach(() => {
		rooms = new Rooms();
		rooms.rooms = [
    	{
    		roomName: 'room0',
				users: 2
    	},
    	{
    		roomName: 'room1',
				users: 3
    	},
    	{
    		roomName: 'room2',
				users: 1
    	}
		];
	});

	it('should create new room', () => {
		var roomName = 'room3';
		rooms.createRoom(roomName);
		expect(rooms.rooms.length).toBe(4);
		expect(rooms.rooms[3].roomName).toBe('room3');
		expect(rooms.rooms[3].users).toBe(1);

	});

	it('should find room by name', () => {
		var roomName = 'room0';
		var room = rooms.getRoom(roomName);
		expect(room.roomName).toBe('room0');
	});

	it('should return udefined for invalid room name', () => {
		var roomName = 'djdjlsis';
		var room = rooms.getRoom(roomName);
		expect(room).toBe(undefined);
	});

	it('should add one user to room', () => {
		var room = rooms.addOne('room0');
		expect(room.users).toBe(3);
	});

	it('should remove one user from room', () => {
		var room = rooms.removeOne('room0');
		expect(room.users).toBe(1);
	});

	it('should remove valid room', () => {
		var roomName = 'room1';
		rooms.removeRoom(roomName);
		expect(rooms.rooms.length).toBe(2);
	});
});
