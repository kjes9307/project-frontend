import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Logo from "../../static/img.svg";
import Wall from "../../static/MetaWall.svg";
import "./Login.css"
import Demo from "../formControl/form.js"
export default class Login extends Component {
    state ={
        loginState : true
      }
    onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    modeSwitch=()=>{
      const {loginState} = this.state
      let status = !loginState
      this.setState({loginState:status})
    }
  render() {
    console.log(this.props,"props Login")
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
              <div className="login-form">
                {/* <LoginForm /> */}
              <Form
                  name="normal_login"
                  className="login-form"
                  // initialValues={{
                  //   remember: true,
                  // }}
                  onFinish={this.onFinish}
                >
                  { loginState ?               
                  <div>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Username!',
                        },
                      ]}
                    >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />}  
                            className="login-form-input"
                            placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Password!',
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        className="login-form-input"
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Button type="primary" className="login-form-button" htmlType="submit" >
                        登入
                      </Button>
                    </div>
                  : 
                    <div>
                      <Form.Item
                        name="nickname"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Nickname!',
                          },
                        ]}
                      >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />}  
                              className="login-form-input"
                              placeholder="Nickname" />
                      </Form.Item>
                      <Form.Item
                        name="Email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                      >
                      <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        type="email"
                        className="login-form-input"
                        placeholder="email"
                        rules={[{ 
                          required: true,
                          type: 'email' 
                        }]}
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Password!',
                          },
                        ]}
                      >
                      <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        className="login-form-input"
                        placeholder="Password"
                        />
                      </Form.Item>
                      <Button type="primary" className="login-form-button" htmlType="submit" >
                        註冊
                      </Button>
                      </div>
                  }
                  <Form.Item>
                      <div className="register" onClick={this.modeSwitch}>
                        {loginState? "註冊帳號":"登入"}
                      </div>
                    </Form.Item>
                  </Form>
              </div>
            </div>
        </div>
        </div> 
    )
  }
}
