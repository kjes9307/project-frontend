import React, { Component } from 'react'
import { Input, Button } from 'antd';
import PostImg from "../../static/image.png"
import "./addContain.css"
import {addPost} from "../../API"
const { TextArea } = Input;
export default class AddPost extends Component {
  state = {
    inputText :""
  }
  onTextChange = e => {
    let inputText = e.target.value;
    this.setState({inputText})
  };
  addNewPost = async() =>{
    const {inputText} = this.state;
    let data = {
      content:`${inputText}`,
      tags : "心情",
      type : "group"  
    }
    let resposne = await addPost(data);
    console.log("really data =",resposne)
    if(resposne.status === 200){
      this.setState({inputText:""});
      this.props.history.push('/post/wall');
    }
  }
  render() {
    console.log(this.props)
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
              <Button
                style={{
                        color: "#fff",
                        marginTop:16,
                        marginBottom:16,
                        background: "black",
                        width:128,
                        height:32}} 
                        disabled>上傳圖片</Button>
              
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
