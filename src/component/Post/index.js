import React, { Component } from 'react'
import moment from 'moment';
import "./post.css"
import testImg from "../../static/image.png"
import {LikeOutlined,UserOutlined,SearchOutlined} from '@ant-design/icons';
import DefaultPost from '../Default';

export default class Post extends Component {
    state ={
        timeNow : "",
        likes:1 ,
        User: [
            {
                "name" :"邊緣人物",
                "likes" : 3,
                "post" : "天氣有點冷...!好想吃火鍋",
                "img" : testImg,
                "comment" : [
                    {
                        "name" : "路人甲",
                        "comment" : "哈哈哈哈哈阿",
                        "img":""
                    },
                    {
                        "name" : "路人乙",
                        "comment" : "++++"
                    }
                ]
            },
            {
                "name" :"邊緣人物",
                "likes" : 3,
                "post" : "今天天氣超好",
                "img" : testImg,
                "comment" : [
                ]
            }
        ]
      }
    componentDidMount(){
        let timeNow = moment(new Date()).format('YYYY/MM/DD HH:mm')
        this.setState({timeNow});
    }
    addLikes = () => {
        const {likes} = this.state;
        let num = likes+1
        this.setState({likes:num})
    }
    onSearchPost = (e) => {
        console.log("onSearch",e);
    }
  render() {
    const  {timeNow,User} = this.state

    return ( 
        <div className='postContain'>
        <div className='postSearch'>
            <select defaultValue="最新的貼文" 
                    style={{ width: "156px",fontSize: "16px" , border: "2px solid #000400",height:"46px" ,background: "#FFF"}} 
                    onChange={this.handleChange}>
              <option value="最新的貼文">最新的貼文</option>
              <option value="test">test</option>
            </select>
            <input 
                placeholder="搜尋貼文" 
                type="search"
                onChange={this.onSearchPost} 
                style={{ padding:"12px 16px",width: "319px",fontSize: "16px",border: "2px solid #000400",height:"46px",opacity: "1",background: "#FFF"}} />
            <div  style={{cursor:"pointer",border: "2px solid #000400",height:"46px",width:"46px",marginLeft:"-12px",position:"relative",background: "#03438D"}}>
                <SearchOutlined style={{fontSize: "20px", opacity: "1",position:"absolute",left:"12px",top:"13px",color:"#fff"}} />
            </div>
        </div>
        { User.length !==0 ?User.map((x)=> (
        <div className="main" key={x.name}>
            <div className="postAvatar">
              <h3 style={{ whiteSpace:"nowrap"}}>{x.name}</h3>
              <span>{timeNow}</span>
            </div>
            <div className="postBody">
              <span>
              {x.post}
              </span>
            </div>
            <div className="postImg">
              <img src={x.img} alt="" />
            </div>
            <div className="user-action">
                <LikeOutlined onClick={this.addLikes} style={{marginLeft:'24px',fontSize: '20px'}} />&nbsp;<span style={{fontSize: '16px'}}>{x.likes}</span>
            </div>
            <div className="user-comment">
                <div style={{position:"relative",fontSize: '20px',border: "1px solid black",height:"46px",width:"46px",borderRadius:"50% 50% 50% 50%"}}>
                <UserOutlined style={{fontSize: '28px',position:"absolute",left:"8px",top:"6px"}}/>
                </div>
                <input placeholder='請輸入留言' style={{padding:"8px 16px",width:'308.5px',marginLeft:'8.5px',height:"40px",border: "2px solid #000400"}} />
                <button children='留言' style={{cursor:"pointer",width:'128px',height:"40px",border: "2px solid #000400",background: "#03438D" ,color:"#fff"}}  />
            </div>
            { x.comment.length !==0? x.comment.map(post=>(
                <div className="user-post" key={post.name}>
                    <div className="user-img">
                        <UserOutlined style={{fontSize: '28px',position:"absolute",left:"5px",top:"3px"}}/>
                        <div className="commentInfo">
                            <h5 style={{fontSize:"16px",fontFamily:"Noto Sans TC",whiteSpace: "nowrap",letterSpacing: "0px",color: "#000400"}}>{post.name}</h5>
                            <span style={{fontSize:"12px",fontFamily:"Baloo Da 2",whiteSpace: "nowrap",color: "#9B9893"}}>{timeNow}</span>
                        </div>
                    </div>
                    <div className="commentText">
                        <span style={{fontSize:"16px",fontFamily:"Noto Sans TC",letterSpacing: "0px",color: "#000400",textAlign: "left"}}>
                            {post.comment}
                        </span> 
                    </div> 
                </div>
            )): null}
        </div>
        )):<DefaultPost />}
    </div>  
    )
  }
}
