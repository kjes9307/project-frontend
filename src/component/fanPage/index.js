import React, { Component } from 'react'
import ShowPost from "../showPost"
import "./fanPage.css"
import userInfo from "../../util/memoryUser"
import {getUserPost} from "../../API"

export default class FanPage extends Component { 
  state = {
      trackStatus : true,
      singlePost:[],
      usedId: {}
  }
  componentDidMount = async() =>{
    let {usedId} = this.props.history.location.state
    let res = await getUserPost({_id:usedId._id});
    if(res.status === 200){
      this.addFlag(res.data);
      this.setState({singlePost:res.data,usedId})
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
    if(res.status === 200){
      this.addFlag(res.data);
      this.setState({singlePost:res.data})
    }
  }
  callChangeUser = async(userInfo) =>{
    let obj ={};
    obj["_id"] = userInfo._id;
    let res = await getUserPost(obj);
    if(res.status === 200){
      this.addFlag(res.data);
      this.setState({singlePost:res.data,usedId: userInfo})
    }
  }
  switchStatus = () =>{
      const {trackStatus}=this.state;
      const newStatus = !trackStatus
      this.setState({trackStatus:newStatus})
  }
  componentWillUnmount = () =>{
    this.setState = () => false;
  }
  render() {
    const {trackStatus,usedId} = this.state
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
                            <span>98798569人追蹤</span>
                        </div>
                    </div>
                    {trackStatus?
                        <button onClick={this.switchStatus}>
                        追蹤
                        </button>
                    :
                        <button onClick={this.switchStatus}>
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
