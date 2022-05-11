
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import 'antd/dist/antd.min.css'
import './App.css';
import Login from './component/Login'
import PostWall from './component/postWall';
import MyNavLink from './router';
class App extends React.Component {
  render(){
    
    return (
      <BrowserRouter>
      <PostWall />
        {/* <MyNavLink to="/" ></MyNavLink>
        <MyNavLink to="/postWall" ></MyNavLink>
        <Switch>
            <Route path="/" component={Login} />
            <Route path="/postWall" component={PostWall} />
            <Redirect to="/"/>
        </Switch> */}
      </BrowserRouter>
    )
  }
}

export default App;
