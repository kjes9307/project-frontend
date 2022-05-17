const Token = 'userToken';
const memoryService = {
    saveUser : (user)=>{
        localStorage.setItem(Token,JSON.stringify(user));
    },
    getUser : 
        () => JSON.parse(localStorage.getItem(Token) || '{}')
    ,
    removeUser :
        () =>  localStorage.removeItem(Token)
}