import React, { Component } from 'react'
import ShowPost from "../showPost"
import "./fanPage.css"
export default class FanPage extends Component { 
  state = {
      trackStatus : true,
      singlePost:[],
      usedId: {}
  }
  componentDidMount = () =>{
    let {usedId,UserPost} = this.props.history.location.state
    let singlePost=UserPost.filter(x=>{
        return x.user._id === usedId._id
    })
    this.setState({singlePost,usedId})
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
            <ShowPost UserPost={this.state.singlePost} />
        </div>
    )
  }
}
