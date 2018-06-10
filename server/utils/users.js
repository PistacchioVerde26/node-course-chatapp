
class Users {

    constructor(){
        this.users = [];    
    }

    addUser (id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id){
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter(u => u.id !== id);
        }
        return user;
    }

    getUser(id){
        var user = this.users.find((u) => u.id === id);
        return user;
    }

    getUserList(roomName){
        var res = this.users.filter((u) => u.room === roomName);
        var names = res.map((u) => u.name);
        return names;
    }

}

module.exports = {Users}
