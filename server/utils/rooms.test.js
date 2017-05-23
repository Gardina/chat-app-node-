const expect = require('expect');
const {Rooms} = require('./rooms.js');

describe('Rooms', () => {
	var rooms;

	beforeEach(() => {
		rooms = new Rooms();
		rooms.rooms = [
    	{
    		sockets: ['1235', '12334', '134','433'],
    		roomName: 'room0'
    	},
    	{
    		sockets: ['1233235', '12333334', '1te34', '4re33'],
    		roomName: 'room1'
    	},
    	{
    		sockets: ['12323235',' 1233224', '1dfd34', '433tetr'],
    		roomName: 'room2'
    	}
		];
	});

	it('should create new room', () => {
		var id = '1234848484884848339';
		var roomName = 'room3';
		rooms.createRoom(id, roomName);
		expect(rooms.rooms.length).toBe(4);
		expect(rooms.rooms[3].roomName).toBe('room3');
		expect(rooms.rooms[3].sockets[0]).toBe('1234848484884848339');
		expect(rooms.rooms[3].sockets.length).toBe(1);
	});

	it('should find room by socket.id', () => {
	  var id = '1235';
		var room = rooms.getRoom(id);
		expect(room.roomName).toBe('room0');
	});

	it('should add socket to existing room socket array', () => {
		var id = '000111';
		rooms.addSocket(id, 'room0');
		expect(rooms.rooms[0].sockets[4]).toBe('000111');
	});

	it('should remove socket from existing room', () => {
		var id = '1235';
		var roomName = 'room0';
		rooms.removeSocket(id, roomName);
		expect(rooms.rooms[0].sockets).toEqual(['12334', '134','433']);
	});

	it('should find room by its name', () => {
		var roomName = 'room1';
		var room = rooms.getRoomByName(roomName);
		expect(room.roomName).toBe('room1');
	});

	it('should remove room by socket.id', () => {
		var id = '1235';
		rooms.removeRoom(id);
		expect(rooms.rooms.length).toBe(2);
		expect(rooms.rooms[1].roomName).toBe('room2');
	});

	it('should return undefined with wrong roomName or id', () => {
		var roomName = 'jjsafjjasofjer';
		var id = '30920sfjafjajfa';
		var resId = rooms.getRoom(id);
		var resName = rooms.getRoomByName(roomName);
		expect(resName).toBe(undefined);
		expect(resId).toBe(undefined);
	});
});
