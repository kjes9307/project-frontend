import React, { Component } from 'react'
import "./edit.css"
import user_default from "../../static/user_default.png"
import EditPassword from '../editPassword';
export default class EditProfile extends Component {
  state ={
        tab1 :  true,
        tab2 : false
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
  render() {
    const { tab1,tab2 } = this.state
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
                    <div className='edit-layout'>
                        <img src={user_default} alt="" />
                        <button style={{background: "#000400",width:128,height:32,color:"#fff",marginTop:10}}>上傳大頭貼照</button>
                    </div>
                    <div className='edit-body'>
                        {tab1 === true ?
                        <div>
                            <div style={{marginBottom:"4px"}}>
                                <label>暱稱</label>
                            </div>
                            <input style={{width:"323px",height:"51px",marginBottom:"16px",padding:"14px 24px"}} />
                            <div style={{marginBottom:"8px"}}>
                                <label>性別</label>
                            </div>
                            <div style={{textAlign:"left"}}>
                                <input type="radio"  ></input>
                                <label style={{marginLeft :"16px"}}>男</label>
                                <input type="radio" style={{marginLeft :"24px"}}></input>
                                <label style={{marginLeft :"16px",width:"20px",height:"20px"}}>女</label>                         
                            </div>
                        </div> 
                        : <EditPassword/> }
                        <button style={{cursor:"pointer",boxShadow:"-2px 2px 0px #000400",background: "#EEC32A",width:"323px",height:"51px",marginBottom:"16px",marginTop:"16px"}}>送出更新</button>
                    </div>
                    
                </div>
            </div>   
      </div>
     
    )
  }
}
