import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import userStatuRecorder from "./util/memoryParams";
import memoryService from "./util/memoryUtil";
import store from "./redux/store";

const user = memoryService.getUser();
userStatuRecorder.length = 0
if(Object.keys(user).length !== 0) userStatuRecorder[0] = user;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

store.subscribe(()=>{
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
})

