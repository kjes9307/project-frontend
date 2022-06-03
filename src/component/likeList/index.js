import React, { Component } from 'react'
import moment from 'moment';
import {getLikeList,delLikes,getSinglePost,addComment,delComment} from "../../API"
import ModelCheck from "../checkLike";
import userInfo from "../../util/memoryUser"
import {UserOutlined,RightCircleOutlined,LikeOutlined} from '@ant-design/icons';
export default class LikeList extends Component {
    state ={ 
        trackUser:[],
        isModalVisible: false,
        checkPost: [],
        postID:"",
        commentText:""
      }
    componentDidMount = () => {
        this.getLikeList();
    }
    getLikeList = async()=>{
      let res = await getLikeList();
      if(res.status ===200 && res.data.length !==0){
          let trackUser= res.data
          this.setState({trackUser})
      }else{
        this.setState({trackUser:[]})
      }
    }
    cancelLikes = async(postID) =>{
      let res = await delLikes(postID)
      if(res.status===201){
        await this.getLikeList();
      }
    }
    addFlag = (data) =>{
      let userID = userInfo.getUser().id;
      data.forEach(x=>{
          x.comments.forEach(info=>{
              if(info.user._id === userID){
                  info.flag = 'Y';
              }
          })
      })
      return data;
    }
    check = async(postID) =>{
      let res = await getSinglePost({key:postID})
      if(res.status === 200){
          let checkPost = this.addFlag(res.data)
          this.setState({checkPost,postID},()=> this.showModal());
      }
    }
    recordCommentForSingle = (e) =>{
      const {value} = e.target
      this.setState({commentText:value});
    }
    sendCommentForSingle = async () =>{
      const {commentText,postID} = this.state;
      let obj ={};
      obj['userComment'] = commentText ; 
      let res = await addComment(postID,obj);
      
      if(res.status===201 && res.data){
        await this.updateData();
      }
      this.setState({commentText:""})
    }
    deleteCommentForSingle = async (commentID) =>{
      let res = await delComment(commentID)
      if(res.status===200){
        await this.updateData();
      }
    }
    updateData = async () =>{
      const {postID} = this.state;
      let newData = await getSinglePost({key:postID})
        if(newData.status === 200){
            let checkPost = this.addFlag(newData.data)
            this.setState({checkPost});
      }
    }
    showModal = () => {
      this.setState({isModalVisible:true})
    };
    handleCancel = () => {
      this.setState({isModalVisible:false})
    };
    clearMsg = (e) =>{
      e.target.value="";
    }
    componentWillUnmount = () =>{
      this.setState = () => false;
    }
  render() {
    const {trackUser} = this.state
    return (
      <div>
        <div className="module-bar">
          我按讚的貼文
        </div>
        
        {trackUser.length!==0 ? trackUser.map(x=>(
          <div className="main" key={x._id}>
        <div className="module-post">
          <div className="user-img">
              { x.user.photo ? 
              <img 
                src={x.user.photo} 
                alt="user avatar" 
                style={{width:40,height:40,borderRadius: 50,position:"absolute",left: 0,top: 0 ,border: "1px solid #fff"}} 
              />:
              <UserOutlined style={{fontSize: 28,position:"absolute",left:5,top:3}}/>
              }
              <div className="commentInfo">
                  <h5 style={{fontWeight:"bold",fontSize:16,fontFamily:"Noto Sans TC",whiteSpace: "nowrap",letterSpacing:0,color: "#000400"}}>{x.user.name}</h5>
                  <span style={{fontSize:14,fontFamily:"Noto Sans TC",whiteSpace: "nowrap",color: "#9B9893"}}> 發文時間 :
                    <span style={{fontSize:14,fontFamily:"Baloo Da 2",whiteSpace: "nowrap",color: "#9B9893"}}>{moment(x.createAt).format('YYYY/MM/DD HH:mm:ss')}</span>
                  </span>
                  <div style={{top:-1,left:310,position:"absolute",fontSize:14,fontFamily:"Noto Sans TC" ,whiteSpace: "nowrap",color: "#000400"}}>
                    <LikeOutlined 
                      onClick={()=>this.cancelLikes(x._id)} 
                      style={{
                        fontSize:20,
                        marginLeft:3.5,
                        color:"#03438D",
                        cursor:"pointer"
                      }} 
                    />
                    <h5 style={{marginTop:5}}>取消</h5>
                  </div>
                    <div style={{
                      top:-1,
                      left:370,
                      position:"absolute",
                      fontSize:14,
                      fontFamily:"Noto Sans TC" ,
                      whiteSpace: "nowrap",
                      color: "#000400"
                      }}>
                    <RightCircleOutlined 
                      onClick={()=>this.check(x._id)} 
                      style={{
                        fontSize:20,
                        marginLeft:3.5 ,
                        cursor:"pointer"
                        }} 
                      />
                    <ModelCheck 
                      isModalVisible={this.state.isModalVisible} 
                      checkPost={this.state.checkPost} 
                      handleCancel={this.handleCancel} 
                      clearMsg = {this.clearMsg}
                      recordComment={this.recordCommentForSingle}
                      sendComment={this.sendCommentForSingle}
                      deleteComment={this.deleteCommentForSingle}
                    />
                  </div>
              </div>
          </div>
        </div>
        </div>
         )):
         <div className="main">
         <div className="module-post">
            <h2
            style={{
              fontWeight:"bold",
              fontSize:16,
              fontFamily:"Noto Sans TC",
              whiteSpace: "nowrap",
              letterSpacing:0,
              textAlign: "center",
              lineHeight: "1.5em",
              color: "#000400"}}>
              尚未對任何人按讚.....趕快按個讚吧
            </h2>
         </div>
         </div>
         }
      
      </div>
     
    )
  }
}
