
import React from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import 'antd/dist/antd.min.css'
import './App.css';
import PostWall from './component/postWall';
import Login from './component/Login';
class App extends React.Component {
  render(){
    
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/post" component={PostWall} />
          <Route path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
