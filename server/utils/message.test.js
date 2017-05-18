const expect = require('expect');

const{generateMessage} = require('./message');

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
