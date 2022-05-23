import React, { Component } from 'react'
import {Button, message} from "antd"
import "./chatRoom.css"
import {sendMsg} from "../../API"
import io from 'socket.io-client'


export default class ChatRoom extends Component {
  state = {
    textInput:""
  }
  componentDidMount = () =>{
  }
  initIO = (res) =>{
    if(!io.socket){
      io.socket = io('ws://localhost:3000')
      io.socket.on("receiveMsg",(data)=>{
        console.log('瀏覽器端接收訊息',data)
      })
    }
    io.socket.emit("sendMsg",res.data)
  }
  inputMsg = (e) => {
    const {value} = e.target
    this.setState({textInput:value})
  }
  submitMsg = async()=>{
    const {textInput} = this.state;
    console.log(textInput);
    if(textInput.trim()){
      let data = {
        content : textInput,
        read : true,
        to : "6281e21843b0a3a5f7187d54" 
      }
      console.log(data)
      let res = await sendMsg(data);
      if(res.status === 200){
        this.initIO(res)
        message.success("發送成功")
      }
    }
  }
  render() {
    return (
        <div className="wrap-chat">
        <div className="contain-chat ">
            <div className="header-chat">Test</div>
            <div className="chats">
                <span className="u1 chat">123</span>
                <span className="u2 chat">456</span>
                <span className="u1 chat">789</span>
            </div>
    
            <div className="subchat">
                <input onChange={this.inputMsg} value={this.state.textInput} type="text" id="message" />
                <Button type="primary"  style={{marginLeft:15}} onClick={this.submitMsg} >Send</Button>
            </div>
        </div>
    </div>
    )
  }
}
