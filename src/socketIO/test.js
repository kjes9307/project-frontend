import io from 'socket.io-client'

// 綁定單一對象
// 檢查對象已經存在，不存在才創建
// 保存對象 => 在哪
const socket = io('ws://localhost:3000')
socket.on("receiveMsg",(data)=>{
    console.log('瀏覽器端接收訊息',data)
})


socket.emit("sendMsg",{
    name:"test"
})
console.log("瀏覽器向sv發送消息",{name:'test'})
