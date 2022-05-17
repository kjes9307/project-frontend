import React, { Component } from 'react'
import { Input } from 'antd';
import PostImg from "../../static/image.png"
import "./addContain.css"
import {addPost} from "../../API"
const { TextArea } = Input;
export default class AddPost extends Component {
  onTextChange = e => {
    console.log('Change:', e.target.value);
  };
  addNewPost = async() =>{
    let data = {
      name: 123,
      content: "123",
      tags : "心情",
      type : "",
      user : "6281e21843b0a3a5f7187d55"
  }
    let resposne = await addPost(data);
    console.log("really data =",resposne)
  }
  render() {
    return (
      <div>
            <div className="module-bar">
                張貼動態
            </div>
            <div className="main">
              <div className="addContain-layout">
              <div>
                <h4 style={{ 
                            marginTop:16,
                            marginBottom:16,
                            letterSpacing: 0,
                            color: "#000400"
                          }}>貼文內容</h4>     
                <TextArea showCount maxLength={100} style={{ height: 169 , width: 469 }} onChange={this.onTextChange} ></TextArea>
              </div>
              <div style={{ width: 469}}>
              <button
                style={{cursor:"pointer",
                        color: "#fff",
                        marginTop:16,
                        marginBottom:16,
                        background: "black",
                        width:128,
                        height:32}}>上傳圖片</button>
              
              <img src={PostImg} style={{ height: 169 , width: 469 }} alt=""></img>
              </div>
              <button onClick={this.addNewPost}
                style={{cursor:"pointer",
                        boxShadow:"-2px 2px 0px #000400",
                        background: "#EEC32A",
                        width:323,
                        height:51,
                        marginBottom:16,
                        marginTop:16}}>送出更新</button>
              </div>
            </div>   
      </div>
    )
  }
}
