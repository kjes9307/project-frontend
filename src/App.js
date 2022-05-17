
import React from 'react';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import 'antd/dist/antd.min.css'
import './App.css';
import PostWall from './component/postWall';
import Login from './component/Login';
import userStatuRecorder from "./util/memoryParams";
class App extends React.Component {
  componentDidMount = () => {
    if(userStatuRecorder.length!==0){
      console.log(this.props.history.replace('/post'))
    }
  }
  render(){
      return ( 
          <Switch>
            <Route path="/post" component={PostWall} />
            <Route path="/" component={Login} />
            <Redirect to="/" />
          </Switch>
      )
  }
}

export default withRouter(App);
