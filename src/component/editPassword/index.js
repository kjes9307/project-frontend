import React, { Component } from 'react'
import {UnlockOutlined,LockOutlined} from '@ant-design/icons';
export default class EditPassword extends Component {
  state = {
    show : false
  }
  setPassWord = (type,e) =>{
    let {value} = e.target
    value = value.trim();
    if(value){
      this.props.resetPass({value,type})
    }
  }
  show = () =>{
    const {show} = this.state
    this.setState({show:!show})
  }
  render() {
    return (
    <div>
      <form>
        <div style={{marginBottom:"4px"}}>
            <label>輸入新密碼{this.state.show ?<UnlockOutlined onClick={this.show} /> : <LockOutlined onClick={this.show} /> }</label>
        </div>
        <input value={this.props.newPassWord} type={this.state.show ? "text":"password"}  autoComplete="off" style={{width:"323px",height:"51px",marginBottom:"16px",padding:"14px 24px"}} onChange={e=>this.setPassWord("newPassWord",e)} />
        <div style={{marginBottom:"4px"}}>
            <label>再次輸入</label>
        </div>
        <input value={this.props.confirmPassWord} type={this.state.show ? "text":"password"}   autoComplete="off" style={{width:"323px",height:"51px",marginBottom:"16px",padding:"14px 24px"}} onChange={e=>this.setPassWord("confirmPassWord",e)}  />
        <div style={{marginBottom:"4px"}}>
            <label style={{color: "#f24"}}>{this.props.info}</label>
        </div>
        </form>
    </div>   
    )
  }
}
