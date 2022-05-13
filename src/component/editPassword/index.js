import React, { Component } from 'react'

export default class EditPassword extends Component {
  render() {
    return (
    <div>
        <div style={{marginBottom:"4px"}}>
            <label>輸入新密碼</label>
        </div>
        <input style={{width:"323px",height:"51px",marginBottom:"16px",padding:"14px 24px"}} />
        <div style={{marginBottom:"4px"}}>
            <label>再次輸入</label>
        </div>
        <input style={{width:"323px",height:"51px",marginBottom:"16px",padding:"14px 24px"}} />
    </div>   
    )
  }
}
