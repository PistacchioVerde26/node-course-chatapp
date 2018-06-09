const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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


describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var coords = {
            latitude: 1111,
            longitude: 2222
        }

        var msg = generateLocationMessage('Admin', coords);

        expect(typeof msg.createdAt).toBe('number');
        expect(msg.url).toBe('https://www.google.com/maps?q=' + coords.latitude + ',' + coords.longitude);


    });
});
