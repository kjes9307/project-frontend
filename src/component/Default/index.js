import React, { Component } from 'react'
import "./DefaultPost.css"
export default class DefaultPost extends Component {
  render() {
    return (
      <div className="default-main">
        <div className="default-head">
            <div className="circle"></div>
            <div className="offset"></div>
            <div className="offset2"></div>
        </div>
        <div className="default-contain">
          目前尚無動態.. 新增一則貼文吧
        </div>
      </div>
    )
  }
}
