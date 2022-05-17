import React, { Component } from 'react'
import "./post.css"
import {LikeOutlined,UserOutlined,SearchOutlined} from '@ant-design/icons';
import DefaultPost from '../Default';
import {getPost} from "../../API"

export default class Post extends Component {
    state ={
        timeNow : "",
        likes:1 ,
        UserPost: []
      }
    componentDidMount = async () =>{
        let res = await getPost({});
        console.log(res);
        if(res.status === 200){
            let UserPost = res.data;
            this.setState({UserPost});
        }
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
    const  {UserPost} = this.state

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
        { UserPost.length !==0 ?UserPost.map((x)=> (
        <div className="main" key={x.name}>
            <div className="postAvatar" style={{backgroundImage: `url(${x.user.photo})`}}>
              <h3 style={{ whiteSpace:"nowrap"}}>{x.name}</h3>
              <span>{x.createAt}</span>
            </div>
            <div className="postBody">
              <span>
              {x.content}
              </span>
            </div>
            <div className="postImg" >
            { x.image !== ""?
              <img 
                // style={{backgroundImage: `url(${x.image})`}}
                src='https://hexschool.github.io/flexImgUrl/3/logo.png' alt = 'stupid react shit'
                />
            : null}
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
            {/* { x.comment.length !==0? x.comment.map(post=>(
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
            )): null} */}
        </div>
        )):<DefaultPost />}
    </div>  
    )
  }
}
