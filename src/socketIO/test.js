import io from 'socket.io-client'

// // 綁定單一對象
// // 檢查對象已經存在，不存在才創建
// // 保存對象 => 在哪
const socket = io('ws://localhost:3000') // 創建連線

socket.emit("clientMsg","hello ")

socket.on("serverMsg",(data)=>{
    console.log('服務器返回',data)
}) // 監聽某個平到

socket.on("history",(data)=>{
    console.log("history in db is =",data)
})



// console.log("瀏覽器向sv發送消息",{name:'test'})
