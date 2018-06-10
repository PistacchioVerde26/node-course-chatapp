const expect = require('expect');

const {Users} = require('./users');

Fdescribe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node course'
        }, {
            id: 2,
            name: 'Jen',
            room: 'React course'
        }, {
            id: 3,
            name: 'Lucas',
            room: 'Node course'
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Alby',
            room: 'Room name'
        }

        users.addUser(user.id, user.name, user.room);
        
        expect(users.users).toMatchObject([user]);
    })

    it('should remove user', () => {
        var userToRemove = users.users[0];
        var removed = users.removeUser(userToRemove.id);
        expect(removed).toEqual(userToRemove);
        expect(users.users.length).toBe(2);
    })

    it('should not remove user', () => {
        var removed = users.removeUser(0);
        expect(removed).toBeFalsy();
        expect(users.users.length).toBe(3);
    })

    it('should find user', () => {
        var user = users.getUser(1);
        expect(user).toBe(users.users[0]);
    })

    it('should not find user', () => {
        var user = users.getUser(0);
        expect(user).toBeFalsy();
    })

    it('should return names for node course', () => {
        var userList = users.getUserList('Node course');
        expect(userList).toEqual(['Mike', 'Lucas']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React course');
        expect(userList).toEqual(['Jen']);
    });

});