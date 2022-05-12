import React, { Component } from 'react'
import moment from 'moment';
import {UserOutlined} from '@ant-design/icons';
import "./track.css"
export default class Track extends Component {
  state ={ 
    timeNow :'' , 
    trackUser:[
      {
        User:"wayne"
      },
      {
        User:"galive"
      },
      {
        User:"Rain"
      }
    ]
  }
  componentDidMount(){
    let timeNow = moment(new Date()).format('YYYY/MM/DD HH:mm')
    this.setState({timeNow});
}
  render() {
    const {trackUser,timeNow} = this.state
    return (
      <div>
        <div className="module-bar">
          追蹤名單
        </div>
        
        {trackUser.length!==0 ? trackUser.map(x=>(
          <div className="main" key={x.User}>
        <div className="module-post">
          <div className="user-img">
              <UserOutlined style={{fontSize: '28px',position:"absolute",left:"5px",top:"3px"}}/>
              <div className="commentInfo">
                  <h5 style={{fontWeight:"bold",fontSize:"16px",fontFamily:"Noto Sans TC",whiteSpace: "nowrap",letterSpacing: "0px",color: "#000400"}}>{x.User}</h5>
                  <span style={{fontSize:"14px",fontFamily:"Noto Sans TC",whiteSpace: "nowrap",color: "#9B9893"}}> 追蹤時間 :
                    <span style={{fontSize:"14px",fontFamily:"Baloo Da 2",whiteSpace: "nowrap",color: "#9B9893"}}>{timeNow}</span>
                  </span>
                  <span style={{top:"16px",left:"330px",position:"absolute",fontSize:"14px",fontFamily:"Noto Sans TC" ,whiteSpace: "nowrap",color: "#000400"}}>已經追蹤90天!</span>
              </div>
          </div>
        </div>
        </div>
         )):null }
      
      </div>
     
    )
  }
}
