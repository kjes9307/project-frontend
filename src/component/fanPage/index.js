import React, { Component } from 'react'
import ShowPost from "../showPost"
import "./fanPage.css"
import userInfo from "../../util/memoryUser"
import {getUserPost,addTrack,unTrack,getTrackList,addFollow,unFollow,getFollow} from "../../API"
import { message } from 'antd'

export default class FanPage extends Component { 
  state = {
      trackStatus : true,
      singlePost:[],
      usedId: {},
      trackNumber: ""
  }
  componentDidMount = async() =>{
    let {usedId} = this.props.history.location.state
    await this.checkTrackStatus(usedId);
    await this.updateFollowNumber(usedId)
    let res = await getUserPost({_id:usedId._id});
    if(res.status === 200){
      this.addFlag(res.data);
      this.setState({singlePost:res.data,usedId})
    }
  }
  checkTrackStatus = async (usedId) => {
    let res = await getTrackList()
    if(res.status === 200 && res.data.length !== 0){
        let data = res.data[0].followList
        let checkFollow = data.find(x=> x._id._id ===usedId._id)
        if(checkFollow !== undefined) this.setState({trackStatus:false})
        else this.setState({trackStatus:true})
    }else{
      this.setState({trackStatus:true})
    }
  }
  updateFollowNumber = async (usedId) =>{
    let res = await getFollow({_id:usedId._id})
    if(res.status === 200){
      let trackNumber = res.data.length !== 0 ? res.data[0].follower.length : 0;
      this.setState({trackNumber});
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
  callStatusChange = async(query) =>{
    const {usedId} = this.state;
    let obj ={};
    obj["_id"] = usedId._id
    if(query && query !== undefined){obj[`${Object.keys(query)[0]}`] = Object.values(query)[0]}
    let res = await getUserPost(obj);
    await this.checkTrackStatus(userInfo);
    await this.updateFollowNumber(userInfo)
    if(res.status === 200){
      this.addFlag(res.data);
      this.setState({singlePost:res.data})
    }
  }
  callChangeUser = async(userInfo) =>{
    let obj ={};
    obj["_id"] = userInfo._id;
    let res = await getUserPost(obj);
    console.log("callback @ fanpage")
    await this.checkTrackStatus(userInfo);
    await this.updateFollowNumber(userInfo)
    if(res.status === 200){
      this.addFlag(res.data);
      this.setState({singlePost:res.data,usedId: userInfo})
    }
  }
  addTrack = async(id) =>{
    const {trackStatus,usedId}=this.state;
    const newStatus = !trackStatus
    let userID = userInfo.getUser().id;
    if(userID === id) {return message.error("不能追蹤自己")}
    let obj={};
    obj['followID'] = {"_id" : id}
    let res = await Promise.all([addTrack(obj),addFollow(obj)]);
    if(res[0].status === 200 && res[1].status===200){
      this.setState({trackStatus:newStatus},async()=>await this.updateFollowNumber(usedId));
    }
  }
  unTrack = async(id) =>{
    const {trackStatus,usedId}=this.state;
    const newStatus = !trackStatus
    let userID = userInfo.getUser().id;
    if(userID === id) {return message.error("不能追蹤自己")}
    let obj={};
    obj['unfollowID'] = {"_id" : id}
    this.setState({trackStatus:newStatus})
    let res = await Promise.all([ unTrack(obj) , unFollow(obj)])
    if(res[0].status === 200 && res[1].status===200){
      this.setState({trackStatus:newStatus},async()=>await this.updateFollowNumber(usedId));
    }
  }
  componentWillUnmount = () =>{
    this.setState = () => false;
  }
  render() {
    const {trackStatus,usedId,trackNumber} = this.state
    return (
        <div>
            <div className="module-fan-bar">
                    <div 
                      className='module-fan-bar-Icon' 
                      style={{
                        background: usedId.photo ?`url(${usedId.photo})` : `url("https://i.imgur.com/2qPisdC.png")`
                      }}>
                        <div className='module-fan-bar-Text'>
                            <h3 style={{marginBottom:5}}>{usedId.name}</h3>
                            <span>{trackNumber}人追蹤</span>
                        </div>
                    </div>
                    {trackStatus?
                        <button onClick={()=>this.addTrack(usedId._id)}>
                        追蹤
                        </button>
                    :
                        <button onClick={()=>this.unTrack(usedId._id)}>
                        取消追蹤
                        </button>
                    }
            </div>
            <ShowPost 
              UserPost={this.state.singlePost} 
              callStatusChange = {this.callStatusChange}
              callChangeUser = {this.callChangeUser}
            />
        </div>
    )
  }
}
