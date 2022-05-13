import React, { Component } from 'react'
import Post from "../Post"
import "./fanPage.css"
export default class FanPage extends Component { 
  state = {
      trackStatus : true
  }
  switchStatus = () =>{
      const {trackStatus}=this.state;
      const newStatus = !trackStatus
      this.setState({trackStatus:newStatus})
  }
  render() {
    const {trackStatus} = this.state
    return (
        <div>
            <div className="module-fan-bar">
                <div className="module-fan-bar">
                    <div className='module-fan-bar-Icon'>
                        <div className='module-fan-bar-Text'>
                            <h3 style={{marginBottom:5}}>阿爾敏</h3>
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
                
            </div>
            <Post />
        </div>
    )
  }
}
