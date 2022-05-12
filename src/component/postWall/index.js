import React, { Component } from 'react'
import {Button} from "antd";
import {Redirect,Switch,Route} from 'react-router-dom';
import "./postwall.css"
import { BellOutlined,UserOutlined,LikeOutlined} from '@ant-design/icons';
import Post from '../Post';
import MyNavLink from "../../router"

export default class PostWall extends Component {
  
  
  handleChange= (value) => {
    console.log(`selected ${value}`);
  }
  onSearch = value => console.log(value);
  render() {
    
    return (
      <div className="wrap">
        <div className="header">
          <h3>MetaWall</h3>
          <div className="title">
            <div className="avatar"></div>
            <span>Member</span>
          </div>
        </div>
        <div className="content">
          <MyNavLink to="/" ></MyNavLink>
          <Switch>
            <Route path="/" component={Post} />
              <Redirect to="/"/>
          </Switch>
          <div className="sidebar">
            <Button type="primary" className='add-btn'>張貼動態</Button>
            <Button type="text" icon={<UserOutlined className='icon'/>}>邊緣人物</Button>
            <Button type="text" icon={<BellOutlined className='icon'/>}>追蹤名單</Button>
            <Button type="text" icon={<LikeOutlined className='icon'/>}>按讚的文章</Button>
          </div>
        </div>
      </div>
    )
  }
}
