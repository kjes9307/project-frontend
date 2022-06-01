import store from 'store';
const Token = 'userInfo';
const userInfo = {
    saveUser : user=> store.set(Token,user)
    ,
    getUser : 
        () => store.get(Token) || {}
    ,
    removeUser :
        () => store.remove(Token)
}

export default userInfo;

// to record user basic info