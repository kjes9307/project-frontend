import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import {Redirect,Switch,Route,BrowserRouter} from 'react-router-dom';
import "./postwall.css"
import { BellOutlined,UserOutlined,LikeOutlined} from '@ant-design/icons';
import Post from '../Post';
import MyNavLink from "../../router"
import Track from '../Track';
import EditProfile from '../editProfile';
import AddPost from '../addPost';
// import Login from "../Login"
export default class PostWall extends Component {
  
  
  handleChange= (value) => {
    console.log(`selected ${value}`);
  }
  onSearch = value => console.log(value);
  menu = () => (
    <Menu
      style={{width:182,textAlign: "center",fontWeight:"bold"}}
      items={[
        {
          label: (
            <MyNavLink to="/post">
              我的貼文
            </MyNavLink>
          ),
        },
        {
          label: (
            <MyNavLink to="/edit">
              修改密碼
            </MyNavLink>
          ),
        },
        {
          label: (
            <MyNavLink to="/login" disabled>
              登出
            </MyNavLink>
          ),
        },
      ]}
    />
  );
  render() {
    
    return (
      <BrowserRouter>
      <div className="wrap">
        <div className="header">
          <h3>MetaWall</h3>
          <div className="title">
            <div className="avatar"></div>
              <Dropdown overlay={this.menu} placement="bottom" arrow={{ pointAtCenter: true }}>
                <span>Member</span>
              </Dropdown>
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route path="/post" component={Post} />
            <Route path="/addPost" component={AddPost} />
            <Route path="/Track" component={Track} />
            <Route path="/edit" component={EditProfile} />
            {/* <Route path="/login" component={Login} /> */}
            <Redirect to="/post" />
          </Switch>
          
          <div className="sidebar">
            <MyNavLink to="/addPost"><Button type="primary" className='add-btn'>張貼動態</Button></MyNavLink>
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
