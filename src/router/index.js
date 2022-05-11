import React, { Component } from 'react'
import { NavLink} from 'react-router-dom';

export default class MyNavLink extends Component {
  render() {
    // const {to,children} = this.props;
    //  用上react 批量解構
    return (
        <NavLink activeClassName='' {...this.props} />
    )
  }
}