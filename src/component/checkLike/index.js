import React from 'react';
import { Modal } from 'antd';
import moment from "moment"
import {LikeOutlined,UserOutlined} from '@ant-design/icons';
const ModelCheck = (props) => {
  return (
    <>
    <h5 style={{marginTop:5}}>查看</h5>
      <Modal 
        centered          
        width={600} 
        title="按讚的貼文"
        visible={props.isModalVisible}
        onOk={props.handleCancel} 
        onCancel={props.handleCancel} 
        >
        {props.checkPost.map((x)=> (
          <div key={x._id}>
                {x.user.photo ?
                <div className="postAvatar" style={{backgroundImage: `url(${x.user.photo})` }}>
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
                    <LikeOutlined  style={{marginLeft:'24px',fontSize: '20px'}} />&nbsp;<span style={{fontSize: '16px'}}>{x.likes.length || 0}</span>
                </div>
                <div className="user-comment">
                    <div style={{position:"relative",fontSize: '20px',border: "1px solid black",height:"46px",width:"46px",borderRadius:"50% 50% 50% 50%"}}>
                    <UserOutlined style={{fontSize: '28px',position:"absolute",left:"8px",top:"6px"}}/>
                </div>
                <input 
                    onBlur={props.clearMsg} 
                    onChange={props.recordComment}
                    placeholder='請輸入留言' 
                    style={{
                        padding:"8px 16px",
                        width:'308.5px',
                        marginLeft:'8.5px',
                        height:"40px",
                        border: "2px solid #000400"}} 
                    />
                <button  
                    children='留言' 
                    onClick={props.sendComment}
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
                        {post.user.photo ?<img src={post.user.photo} alt="user_img" style={{width:40,height:40,borderRadius: 50,position:"absolute",left: 0,top: 0 ,border: "1px solid #000400"}} /> :
                        <UserOutlined style={{fontSize: '28px',position:"absolute",left:"5px",top:"3px"}}/>}
                        <div className="commentInfo">
                            <h5 style={{fontSize:"16px",fontFamily:"Noto Sans TC",whiteSpace: "nowrap",letterSpacing: "0px",color: "#000400"}}>{post.user.name}</h5>
                            <span style={{fontSize:"12px",fontFamily:"Baloo Da 2",whiteSpace: "nowrap",color: "#9B9893"}}>{moment(post.createTime).format('YYYY-MM-DD HH:mm:ss')} &nbsp;<span className='delBtn' onClick={()=>props.deleteComment(post._id)}>{post.flag?"刪除貼文":null}</span></span>
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
        ))}
      </Modal>
    </>
  );
};

export default ModelCheck;