import React, { Component } from 'react'
import validator from 'validator';
import "./edit.css"
import EditPassword from '../editPassword';
import {resetPASS,uploadImg,updataProfile,getProfile} from "../../API"
import userInfo from "../../util/memoryUser"
export default class EditProfile extends Component {
  state ={
        tab1 :  true,
        tab2 : false,
        newPassWord : "",
        confirmPassWord :"",
        info: "",
        checkStatus : false,
        sexType : "",
        nickName: "",
        userPhoto : "",
        upload: "",
        profile: {}
  }
  componentDidMount = async () => {
    let res = await getProfile();
    if(res.status===200){
        this.setState({
            sexType:res.data.sex,
            userPhoto:res.data.photo,
            nickName:res.data.name
        })
    }
  }
  sendUpload = async () =>{
    const {upload} = this.state
    let file = new FormData();
    file.append('file',upload);
    let resposne = await uploadImg(file);
    if(resposne.status === 200){
      this.setState({userPhoto:resposne.data.url,upload:""})
    }
  }
  uploadChange = (info) => {
    const {files}  = info.target
    console.log(files)
    if(files[0]){
      this.setState({upload:files[0]}, async()=> await this.sendUpload());
    }
  }
  swtichMode =(e)=>{
      const {tab1,tab2} = this.state
    //   console.log("@1",tab1,"@2",tab2)
      if(e==="tab1" && tab1 !== true){
          this.setState({tab1:true,tab2:false});
      }else if (e==="tab2"&& tab2 !== true){
          this.setState({tab1:false,tab2:true});
      }
  }
  resetPass = ({type,value}) =>{
    this.setState({[type]:value},()=>{
    if(!validator.isAlphanumeric(value,'en-US')) {
        this.setState({info:"密碼僅能是數字與英文的組合!",checkStatus:false})
    }
    else if(!validator.isLength(value,{min:6})){
        this.setState({info:"密碼少於6個字元!",checkStatus:false}) 
    }
    else{
        this.setState({checkStatus:true,info:""});
    }
    })
  }
  sendReq = async() =>{
    const {tab1,newPassWord,confirmPassWord,checkStatus,sexType,nickName,userPhoto} = this.state;
    if(tab1){
        console.log(sexType,nickName,userPhoto);
        let data = {sex : sexType, name : nickName , photo: userPhoto}
        let res = await updataProfile(data);
        if(res.status===200){
            userInfo.saveUser(data);
        }
    }else{
        let checkEqual = validator.equals(newPassWord,confirmPassWord);
        if(checkStatus && checkEqual){
            await resetPASS({password:confirmPassWord,newPassword:newPassWord});
            this.setState({newPassWord : "",confirmPassWord :"",info: ""})
        }
        else this.setState({info:"輸入密碼不一致",checkStatus:false})
    }
  }
  nameChange= (e) =>{
    this.setState({nickName:e.target.value})
  }
  checkSex = (type)=>{
    this.setState({sexType:type})
  }
  cancal=(type) =>{
      if(type === this.state.sexType){
          this.setState({sexType:""})
      }
  }
  render() {
    const { tab1,tab2,confirmPassWord,newPassWord } = this.state
    return (
        <div>
            <div className="module-bar">
                修改個人資料
            </div>
            <div className='edit-bar'>
                <div style={{cursor:"pointer"}} className={tab1?'edit-bar-item edit-bar-offset':'edit-bar-item'} onClick={()=>this.swtichMode("tab1")}>暱稱修改</div>
                <div style={{cursor:"pointer"}} className={tab2?'edit-bar-item edit-bar-offset':'edit-bar-item'} onClick={()=>this.swtichMode("tab2")}>重設密碼</div>
            </div>
            <div className="main">
                <div className="module-post">
                {tab1 === true ?
                    <div className='edit-layout'>
                        {this.state.userPhoto?
                        <img src={this.state.userPhoto} style={{marginBottom:20,height:100,width:100,objectFit: "cover"}} alt="user" />
                        :<img src="https://i.imgur.com/2qPisdC.png" style={{marginBottom:20,height:100,width:100}} alt="user" />
                        }
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
                        </form>
                    </div>   
                : null }
                    <div className='edit-body'>
                        {tab1 === true ?
                        <div>
                            <div style={{marginBottom:"4px"}}>
                                <label>暱稱</label>
                            </div>
                            <input onChange={this.nameChange} value={this.state.nickName}  style={{width:"323px",height:"51px",marginBottom:"16px",padding:"14px 24px"}} />
                            <div style={{marginBottom:"8px"}}>
                                <label>性別</label>
                            </div>
                            <div style={{textAlign:"left"}}>
                                <input type="radio" onClick={()=>this.cancal("男性")} checked={this.state.sexType === "男性"} onChange={()=>this.checkSex("男性")}></input>
                                <label style={{marginLeft :"16px"}}>男</label>
                                <input type="radio" onClick={()=>this.cancal("女性")} checked={this.state.sexType === "女性"} style={{marginLeft :"24px"}} onChange={()=>this.checkSex("女性")}></input>
                                <label style={{marginLeft :"16px",width:"20px",height:"20px"}}>女</label>                         
                            </div>
                        </div> 
                        : <EditPassword confirmPassWord={confirmPassWord} newPassWord={newPassWord} resetPass={this.resetPass} info={this.state.info} /> }
                        <button onClick={this.sendReq} style={{cursor:"pointer",boxShadow:"-2px 2px 0px #000400",background: "#EEC32A",width:"323px",height:"51px",marginBottom:"16px",marginTop:"16px"}}>送出更新</button>
                    </div>
                    
                </div>
            </div>   
      </div>
     
    )
  }
}
