const expect = require('expect');

const {isRealString} = require('./validation.js');

describe('isRealString', () => {
	it('should return valid string', () => {
		const number = isRealString(12234);
		const space = isRealString('      ');
		const str = isRealString('valid name ');
		expect(number).toBe(false);
		expect(space).toBe(false);
		expect(str).toBe(true);
	});

});
