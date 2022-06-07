import React, { Component, lazy, Suspense} from 'react'
import { Menu, Dropdown, Button } from 'antd';
import {Redirect,Switch,Route} from 'react-router-dom';
import "./postwall.css"
import { BellOutlined,UserOutlined,LikeOutlined} from '@ant-design/icons';
import DefaultPost from '../Default';
import MyNavLink from "../../router"
import memoryParams from "../../util/memoryParams"
import memoryService from "../../util/memoryUtil"
import userInfo from "../../util/memoryUser"
const Post = lazy(()=>import('../Post'))
const Track = lazy(()=>import('../Track'))
const AddPost = lazy(()=>import('../addPost'))
const LikeList = lazy(()=>import('../likeList'))
const EditProfile = lazy(()=>import('../editProfile'))
const FanPage = lazy(()=>import('../fanPage'))

export default class PostWall extends Component {
  handleChange= (value) => {
    console.log(`selected ${value}`);
  }
  onSearch = value => console.log(value);
  Logout = () =>{
    memoryParams.length = 0 ;
    memoryService.removeUser();
    userInfo.removeUser();
  }
  menu = () => (
    <Menu
      style={{width:182,textAlign: "center",fontWeight:"bold"}}
      items={[
        {
          label: (
            <MyNavLink to="/post/wall">
              我的貼文
            </MyNavLink>
          ),
        },
        {
          label: (
            <MyNavLink to="/post/edit">
              修改密碼
            </MyNavLink>
          ),
        },
        {
          label: (
            <MyNavLink onClick={this.Logout} to="/login" >
              登出
            </MyNavLink>
          ),
        },
      ]}
    />
  );
  loading = () =>{
    return (
      <div className="default-main">
        <div className="default-head">
            <div className="circle"></div>
            <div className="offset"></div>
            <div className="offset2"></div>
        </div>
        <div className="default-contain">
          loading...
        </div>
      </div>
    )
  }
  render() {
    let user = userInfo.getUser();
    let userName = user.name ? user.name : "unknown";
    return (
      <div className="wrap">
        <div className="header">
          <h3>MetaWall</h3>
          <div className="title">
            <div className="avatar" style={{backgroundImage: `url(${user.photo})`}}></div>
              <Dropdown overlay={this.menu} placement="bottom" arrow={{ pointAtCenter: true }}>
                <span>{userName}</span>
              </Dropdown>
          </div>
        </div>
        <div className="content">
          <Switch>
            <Suspense fallback={<DefaultPost data={"Loading.."} />}>
            <Route path="/post/wall" component={Post} />
            <Route path="/post/addPost" component={AddPost} />
            <Route path="/post/Track" component={Track} />
            <Route path="/post/edit" component={EditProfile} />
            <Route path="/post/likeList" component={LikeList} />
            <Route path="/post/fanPage/:id" component={FanPage} />
            <Redirect to="/post/wall" />
            </Suspense>
          </Switch>
          
          <div className="sidebar">
            <MyNavLink to="/post/addPost"><Button type="primary" className='add-btn'>張貼動態</Button></MyNavLink>
            <MyNavLink to="/post/wall" ><Button type="text" icon={<UserOutlined className='icon'/>}>{userName}</Button></MyNavLink>
            <MyNavLink to="/post/Track"><Button type="text" icon={<BellOutlined className='icon'/>}>追蹤名單</Button></MyNavLink>
            <MyNavLink to="/post/likeList"><Button type="text" icon={<LikeOutlined className='icon'/>}>按讚的文章</Button></MyNavLink>
         </div>
          
        </div>
      </div>
      
    )
  }
}
