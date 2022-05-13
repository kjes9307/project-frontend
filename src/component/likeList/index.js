import React, { Component } from 'react'
import moment from 'moment';
import {UserOutlined,UserDeleteOutlined,RightCircleOutlined} from '@ant-design/icons';
{/* <UserDeleteOutlined /> <RightCircleOutlined /> */}
export default class LikeList extends Component {
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
          我按讚的貼文
        </div>
        
        {trackUser.length!==0 ? trackUser.map(x=>(
          <div className="main" key={x.User}>
        <div className="module-post">
          <div className="user-img">
              <UserOutlined style={{fontSize: 28,position:"absolute",left:5,top:3}}/>
              <div className="commentInfo">
                  <h5 style={{fontWeight:"bold",fontSize:16,fontFamily:"Noto Sans TC",whiteSpace: "nowrap",letterSpacing:0,color: "#000400"}}>{x.User}</h5>
                  <span style={{fontSize:14,fontFamily:"Noto Sans TC",whiteSpace: "nowrap",color: "#9B9893"}}> 追蹤時間 :
                    <span style={{fontSize:14,fontFamily:"Baloo Da 2",whiteSpace: "nowrap",color: "#9B9893"}}>{timeNow}</span>
                  </span>
                  <div style={{top:-1,left:310,position:"absolute",fontSize:14,fontFamily:"Noto Sans TC" ,whiteSpace: "nowrap",color: "#000400"}}>
                    <UserDeleteOutlined style={{fontSize:20,marginLeft:3.5,color:"#03438D",cursor:"pointer"}} />
                    <h5 style={{marginTop:5}}>取消</h5>
                  </div>
                  <div style={{top:-1,left:370,position:"absolute",fontSize:14,fontFamily:"Noto Sans TC" ,whiteSpace: "nowrap",color: "#000400"}}>
                    <RightCircleOutlined style={{fontSize:20,marginLeft:3.5 ,cursor:"pointer"}} />
                    <h5 style={{marginTop:5}}>查看</h5>
                  </div>
              </div>
          </div>
        </div>
        </div>
         )):null }
      
      </div>
     
    )
  }
}
