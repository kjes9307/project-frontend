import React, { Component } from 'react'
import Logo from "../../static/img.svg";
import Wall from "../../static/MetaWall.svg";
import "./Login.css"
import LoginForm from "../formControl/form.js"
export default class Login extends Component {
  state ={
      loginState : true
    }
  modeSwitch=()=>{
    const {loginState} = this.state
    let status = !loginState
    this.setState({loginState:status})
  }
  render() {
    const {loginState} = this.state
    return (
        <div className='container'>
        <div className='login-container'>
            <img className="login-Logo" src={Logo} alt="Logo" />
            <div className="login-item">
              <div className="login-bar">
                <img src={Wall} alt="Logo-Wall" />
                <h3>到元宇宙展開全新社交圈</h3>
              </div>
              <LoginForm {...this.props} action={loginState} modeSwitch={this.modeSwitch} />
            </div>
        </div>
        </div> 
    )
  }
}
