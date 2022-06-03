import React, { Component } from 'react'
import { Input } from 'antd';
import "./addContain.css"
import {addPost,uploadImg} from "../../API"
const { TextArea } = Input;
export default class AddPost extends Component {
  state = {
    inputText :"",
    uploadStatus : false,
    upload:"",
    uploalUrl : ""
  }
  onTextChange = e => {
    let inputText = e.target.value;
    this.setState({inputText})
  };
  addNewPost = async() =>{
    const {inputText,uploalUrl} = this.state;
    let data = {
      content:`${inputText}`,
      tags : "心情",
      type : "group" ,
      image: uploalUrl
    }
    let resposne = await addPost(data);
    console.log("really data =",resposne)
    if(resposne.status === 200){
      this.setState({inputText:""});
      this.props.history.push('/post/wall');
    }
  }
  sendReq = async () =>{
    const {upload} = this.state
    let file = new FormData();
    file.append('file',upload);
    let resposne = await uploadImg(file);
    if(resposne.status === 200){
      this.setState({uploalUrl:resposne.data.url,upload:"",uploadStatus:true})
    }
  }
  uploadChange = (info) => {
    const {files}  = info.target
    if(files[0]){
      this.setState({upload:files[0],uploadStatus:false}, async()=> await this.sendReq());
    }
  }
  componentWillUnmount = () =>{
    this.setState = () => false;
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
              <div style={{ width: 469 }}>
                <form method="POST" encType="multipart/form-data">
                  <label style={{
                            color: "#fff",
                            background: "black",
                            width:128,
                            height:32, 
                            padding: "8px 30px",
                            marginTop:16,
                            marginBottom:16}} >
                    <input type='file'
                            style={{
                              display:"none"}}
                    onChange={this.uploadChange}  />
                    <span 
                  
                    style={{
                      fontSize:16}}
                            >上傳圖片
                    </span>
                  </label>
                  <span style={{color:"red"}}>&nbsp;{this.state.uploadStatus === true ?"上傳成功":null}</span>
                  </form>
              {this.state.uploadStatus === true ?<img src={this.state.uploalUrl} style={{ marginTop:16, maxHeight: 169 , maxWidth: 469 }} alt=""></img> : null}
              </div>
              <button onClick={this.addNewPost}
                style={{cursor:"pointer",
                        boxShadow:"-2px 2px 0px #000400",
                        background: "#EEC32A",
                        width:323,
                        height:51,
                        margin: "16px 0px"
                      }}>送出更新</button>
              </div>
            </div>   
      </div>
    )
  }
}
