import store from 'store';
const Token = 'userToken';
const memoryService = {
    saveUser : user=> store.set(Token,user)
    ,
    getUser : 
        () => store.get(Token) || {}
    ,
    removeUser :
        () => store.remove(Token)
}

export default memoryService;
