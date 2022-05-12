import React, { Component } from 'react'
import {Button} from "antd";
import {Redirect,Switch,Route,BrowserRouter,Link} from 'react-router-dom';
import "./postwall.css"
import { BellOutlined,UserOutlined,LikeOutlined} from '@ant-design/icons';
import Post from '../Post';
import MyNavLink from "../../router"
import Track from '../Track';
import DefaultPost from '../Default';
import EditProfile from '../editProfile';
export default class PostWall extends Component {
  
  
  handleChange= (value) => {
    console.log(`selected ${value}`);
  }
  onSearch = value => console.log(value);
  render() {
    
    return (
      <BrowserRouter>
      <div className="wrap">
        <div className="header">
          <h3>MetaWall</h3>
          <div className="title">
            <div className="avatar"></div>
            <MyNavLink to="/edit" ><span>Member</span></MyNavLink>
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route path="/post" component={Post} />
            <Route path="/Track" component={Track} />
            <Route path="/edit" component={EditProfile} />
            <Redirect to="/post" />
          </Switch>
          
          <div className="sidebar">
            <Button type="primary" className='add-btn'>張貼動態</Button>
            <MyNavLink to="/post" ><Button type="text" icon={<UserOutlined className='icon'/>}>邊緣人物</Button></MyNavLink>
            <MyNavLink to="/Track"><Button type="text" icon={<BellOutlined className='icon'/>}>追蹤名單</Button></MyNavLink>
            <Button type="text" icon={<LikeOutlined className='icon'/>}>按讚的文章</Button>
         </div>
          
        </div>
      </div>
      </BrowserRouter>
    )
  }
}
