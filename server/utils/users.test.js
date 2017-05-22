const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'node course'
		},
		{
			id: '2',
			name: 'Jen',
			room: 'react course'
		},
		{
			id: '3',
			name: 'kolyan',
			room: 'node course'
		}];
	});
	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Andrey',
			room: 'The office fans'
		};
		var resUsers = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		var resUsers = users.removeUser('3');
		expect(users.users).toEqual([
			{
  			id: '1',
  			name: 'Mike',
  			room: 'node course'
  		},
  		{
  			id: '2',
  			name: 'Jen',
  			room: 'react course'
  		}
		]);
	});

	it('should not remove user if id not exist', () => {
		var user = users.removeUser('3ddsd');
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user by id', () => {
		var user = users.getUser('1');
		expect(user).toEqual({
			id: '1',
			name: 'Mike',
			room: 'node course'
		});
	});

	it('should not find user if id not exist', () => {
		var user = users.getUser('329203091039');
		expect(user).toNotExist;
	});

	it('should return names for node course', () => {
		var userList = users.getUserList('node course');

		expect(userList).toEqual(['Mike','kolyan']);
	});
});
