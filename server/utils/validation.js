var isRealString = (str) => {
	return typeof str === 'string' && str.trim().length > 0;
};

var isUniqueUser = (users, name, room) => {
	if (users.filter((user) => user.name === name && user.room === room).length === 1) {
		return false;
	} else {
		return true;
	}
};

var isNewRoom = (rooms, room) => {
	if(rooms.filter((existingRoom) => existingRoom === room).length === 0) {
		return true;
	} else {
		return false;
	}
};

module.exports ={isRealString, isUniqueUser, isNewRoom};
