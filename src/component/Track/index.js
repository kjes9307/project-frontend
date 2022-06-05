import React, { Component } from 'react'
import moment from 'moment';
import {UserOutlined} from '@ant-design/icons';
import {getTrackList} from "../../API"
import "./track.css"
export default class Track extends Component {
  state ={ 
    trackUser:[]
  }
  componentDidMount= async() => {
    let res = await getTrackList();
    if(res.status === 200){
      let trackUser =  res.data.length !== 0 ? res.data: [];
      this.setState({trackUser});
    }
  }
  goFanPage = (usedId) =>{
    this.props.history.push(`/post/fanPage/${usedId._id}`,{usedId})
  }
  componentWillUnmount = () =>{
    this.setState = () => false;
  }
  render() {
    const {trackUser} = this.state
    return (
      <div>
        <div className="module-bar">
          追蹤名單
        </div>
        {trackUser.length!==0 ? trackUser[0].followList.map(x=>(
          <div className="main" key={x._id._id}>
        <div className="module-post">
          <div className="user-img">
              { x._id.photo ? 
                <img 
                  src={x._id.photo} 
                  style={{
                    height:40,
                    width:40,
                    position:"absolute",
                    borderRadius: 50
                  }} 
                  alt="user avatar" 
                  onClick={()=>this.goFanPage(x._id)}
                /> :
                <UserOutlined style={{fontSize: '28px',position:"absolute",left:"5px",top:"3px"}}/>
              }
              <div className="commentInfo">
                  <h5 style={{fontWeight:"bold",fontSize:"16px",fontFamily:"Noto Sans TC",whiteSpace: "nowrap",letterSpacing: "0px",color: "#000400"}}>{x._id.name}</h5>
                  <span style={{fontSize:"14px",fontFamily:"Noto Sans TC",whiteSpace: "nowrap",color: "#9B9893"}}> 追蹤時間 :
                    <span style={{fontSize:"14px",fontFamily:"Baloo Da 2",whiteSpace: "nowrap",color: "#9B9893"}}>{moment(x.followDate).format('YYYY/MM/DD')}</span>
                  </span>
                  <span style={{
                    top:"16px",
                    left:"330px",
                    position:"absolute",
                    fontSize:"14px",
                    fontFamily:"Noto Sans TC" ,
                    whiteSpace: "nowrap",
                    color: "#000400"
                    }}>
                      已經追蹤{
                        moment.duration(
                          moment().startOf('day').diff(moment(x.followDate, "YYYY/MM/DD"))
                        ).asDays()
                      }天!
                    </span>
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
              尚未對任何人進行追蹤....
            </h2>
         </div>
         </div>
         }
      </div>
     
    )
  }
}
