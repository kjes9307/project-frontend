import React, { Component } from 'react'
import {LikeOutlined,UserOutlined,SearchOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
import moment from "moment"
import {addLikes,delLikes,addComment,delComment} from "../../API"
import userInfo from "../../util/memoryUser"
import DefaultPost from '../Default';


class ShowPost extends Component {
    state ={
        timeNow : "",
        commentText: "",
        postID:"",
      }
   
    addLikes = async (postID,postLikes) => {
        let userID = userInfo.getUser().id;
        let res ;
        if(postLikes.indexOf(userID) === -1) res = await addLikes(postID);
        else res = await delLikes(postID);
        const { status } = res;
        if(status===201){
            await this.props.callStatusChange();
        }
    }
    ClickSearch = async() =>{
        const {value} = this.searchInput
        if(value.trim() !== ''){
            await this.props.callStatusChange({key:value});
        }else{
            await this.props.callStatusChange();
        }
    }
    handleSort = async(e) => {
        console.log("filter",e.target.value)
        const {value} = e.target
        await this.props.callStatusChange({timeSort:value});
    }
    recordComment = (editID,e) =>{
        const {postID} = this.state
        if(editID !== postID) {
            this.setState({postID:"",commentText:""});
        }
        const {value} = e.target
        this.setState({postID:editID, commentText:value});
    }
    clearMsg = (e) =>{
        e.target.value="";
    }
    sendComment = async () =>{
        const {commentText,postID} = this.state;
        let obj ={};
        obj['userComment'] = commentText ; 
        let res = await addComment(postID,obj);
    
        if(res.status===201 && res.data){
            await this.props.callStatusChange();
        }
        this.setState({commentText:"",postID:""})
    }
    deleteComment = async (postID) =>{
        let res = await delComment(postID)
        if(res.status===200){
            await this.props.callStatusChange();
        }
    }
    goFanPage = async(usedId)=>{
        this.props.history.replace(`/post/fanPage/${usedId._id}`,{usedId})
        await this.props.callChangeUser(usedId);
    }
    componentWillUnmount = () =>{
        this.setState = () => false;
    }
    render() {
    return ( 
        <div className='postContain'>
        <div className='postSearch'>
            <select defaultValue="最新的貼文" 
                    style={{ width: "156px",fontSize: "16px" , border: "2px solid #000400",height:"46px" ,background: "#FFF"}} 
                    onChange={this.handleSort}>
              <option value="desc">最新貼文</option>          
              <option value="asc">最舊貼文</option> 
            </select>
            <input 
                placeholder="搜尋貼文" 
                type="search"
                ref={(e) => this.searchInput = e} 
                style={{ padding:"12px 16px",width: "319px",fontSize: "16px",border: "2px solid #000400",height:"46px",opacity: "1",background: "#FFF"}} />
            <div  style={{cursor:"pointer",border: "2px solid #000400",height:"46px",width:"46px",marginLeft:"-12px",position:"relative",background: "#03438D"}}>
                <SearchOutlined onClick={this.ClickSearch} style={{fontSize: "20px", opacity: "1",position:"absolute",left:"12px",top:"13px",color:"#fff"}} />
            </div>
        </div>
        { this.props.UserPost.length !==0 ? this.props.UserPost.map((x)=> (
        <div className="main" key={x._id}>
            {x.user.photo ?
            <div className="postAvatar" onClick={()=>this.goFanPage(x.user)} style={{backgroundImage: `url(${x.user.photo})` }}>
              <h3 style={{ whiteSpace:"nowrap"}}>{x.user.name}</h3>
              <span>{moment(x.createAt).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
            : 
            <div className="postAvatar">
              <div style={{position:"relative",fontSize: '20px',border: "1px solid black",height:"46px",width:"46px",borderRadius:"50% 50% 50% 50%"}}>
                <UserOutlined style={{fontSize: '28px',position:"absolute",left:"8px",top:"6px"}}/>
                </div>
              <h3 style={{ whiteSpace:"nowrap"}}>{x.name}</h3>
              <span>{moment(x.createAt).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
            }
            <div className="postBody">
              <span>
              {x.content}
              </span>
            </div>
            <div className="postImg" >
            { x.image !== ""?
              <img 
                src={x.image} alt = 'upload' style={{maxHeight:169,maxWidth:533,objectFit: "cover"}}
                />
            : null}
            </div>
            <div className="user-action">
                <LikeOutlined onClick={()=>this.addLikes(x._id,x.likes)} style={{marginLeft:'24px',fontSize: '20px'}} />&nbsp;<span style={{fontSize: '16px'}}>{x.likes.length || 0}</span>
            </div>
            <div className="user-comment">
                <div style={{position:"relative",fontSize: '20px',border: "1px solid black",height:"46px",width:"46px",borderRadius:"50% 50% 50% 50%"}}>
                <UserOutlined style={{fontSize: '28px',position:"absolute",left:"8px",top:"6px"}}/>
                </div>
                <input 
                    onBlur={this.clearMsg} 
                    onChange={(e)=>this.recordComment(x.id,e)} 
                    placeholder='請輸入留言' 
                    style={{
                        padding:"8px 16px",
                        width:'308.5px',
                        marginLeft:'8.5px',
                        height:"40px",
                        border: "2px solid #000400"}} 
                    />
                <button  
                    onClick={this.sendComment} 
                    children='留言' 
                    style={{
                        cursor:"pointer",
                        width:'128px',
                        height:"40px",
                        border: "2px solid #000400",
                        background: "#03438D" ,
                        color:"#fff"}}  
                    />
            </div>
            { x.comments.length !==0? x.comments.map(post=>(
                <div className="user-post" key={post._id}>
                    <div className="user-img">
                        {post.user.photo ?<img onClick={()=>this.goFanPage(post.user)} src={post.user.photo} alt="user_img" style={{width:40,height:40,borderRadius: 50,position:"absolute",left: 0,top: 0 ,border: "1px solid #000400"}} /> :
                        <UserOutlined onClick={()=>this.goFanPage(post.user)} style={{fontSize: '28px',position:"absolute",left:"5px",top:"3px"}}/>}
                        <div className="commentInfo">
                            <h5 style={{fontSize:"16px",fontFamily:"Noto Sans TC",whiteSpace: "nowrap",letterSpacing: "0px",color: "#000400"}}>{post.user.name}</h5>
                            <span style={{fontSize:"12px",fontFamily:"Baloo Da 2",whiteSpace: "nowrap",color: "#9B9893"}}>{moment(post.createTime).format('YYYY-MM-DD HH:mm:ss')} &nbsp;<span className='delBtn' onClick={()=>this.deleteComment(post._id)}>{post.flag?"刪除貼文":null}</span></span>
                        </div>
                    </div>
                    <div className="commentText">
                        <span style={{fontSize:"16px",fontFamily:"Noto Sans TC",letterSpacing: "0px",color: "#000400",textAlign: "left"}}>
                            {post.userComment}
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
export default withRouter(ShowPost);