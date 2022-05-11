import React, { Component } from 'react'
import moment from 'moment';
import {Button,Select,Input } from "antd";
import "./postwall.css"
import testImg from "../../static/image.png"
import { BellOutlined,UserOutlined,LikeOutlined} from '@ant-design/icons';
const { Option } = Select;
const { Search } = Input;
export default class PostWall extends Component {
  state ={
    timeNow : ""
  }
  componentDidMount(){
    let timeNow = moment(new Date()).format('YYYY/MM/DD HH:mm')
    this.setState({timeNow});
  }
  handleChange= (value) => {
    console.log(`selected ${value}`);
  }
  onSearch = value => console.log(value);
  render() {
    const  {timeNow} = this.state
    
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
        <div className='postContain'>
          <div className='postSearch'>
                <Select defaultValue="最新的貼文" 
                        style={{ width: "156px",fontSize: "16px" , border: "0px solid #000400" ,background: "#FFF"}} 
                        onChange={this.handleChange}>
                  <Option value="最新的貼文">最新的貼文</Option>
                  <Option value="test">test</Option>
                </Select>
                <Search 
                    placeholder="input search text" 
                    allowClear onSearch={this.onSearch} 
                    enterButton="Search"
                    style={{ width: "365px",fontSize: "16px"  , border: "0px solid #000400" , opacity: "1"}} />
          </div>
          <div className="main">
                <div className="postAvatar">
                  <h3>NickName</h3>
                  <span>{timeNow}</span>
                </div>
                <div className="postBody">
                  <span>
                    天氣有點冷...!<br/>
                    好想吃火鍋
                  </span>
                </div>
                <div className="postImg">
                  <img src={testImg} alt="" />
                </div>
            </div>
          </div>  
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
