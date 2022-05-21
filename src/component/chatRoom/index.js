import React, { Component } from 'react'
import {Button} from "antd"
import "./chatRoom.css"
export default class ChatRoom extends Component {
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
                <input type="text" id="message" />
                <Button type="primary" style={{marginLeft:15}}>Send</Button>
            </div>
        </div>
    </div>
    )
  }
}
