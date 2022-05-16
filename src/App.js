
import React from 'react';
// import {BrowserRouter} from 'react-router-dom';
import 'antd/dist/antd.min.css'
import './App.css';
import Login from './component/Login'
import PostWall from './component/postWall';
class App extends React.Component {
  render(){
    
    return (
        // <Login />
        <PostWall />
    )
  }
}

export default App;
