import io from 'socket.io-client'


const socket = io('ws://localhost:3000')



socket.on("receiveMsg",(data)=>{
    console.log('瀏覽器端接收訊息',data)
})


socket.emit("sendMsg",{
    name:"test"
})
console.log("瀏覽器向sv發送消息",{name:'test'})
