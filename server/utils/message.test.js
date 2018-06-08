const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a new message', () => {
        var message = generateMessage('Sender', 'Message text');

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from: 'Sender',
            text: 'Message text'
        });

    })
})

