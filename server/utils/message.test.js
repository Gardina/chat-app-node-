const expect = require('expect');

const{generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var from = 'admin';
		var text = 'welcome';
		var res = generateMessage(from, text);
		expect(res.from).toMatch(from);
		expect(res.text).toMatch(text);
		expect(res.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('sjoud generate correct location object', () => {
		var from = 'valerich';
		var lat = 1234;
		var lon = 5678;
		var res = generateLocationMessage(from, lat, lon);
		expect(res.from).toMatch(from);
		expect(res.createdAt).toBeA('number');
		expect(res.url).toMatch('https://www.google.com/maps?q=1234,5678');
	});
});
