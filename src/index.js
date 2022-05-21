import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import userStatuRecorder from "./util/memoryParams";
import memoryService from "./util/memoryUtil";
import './socketIO/test'
import { Provider } from 'react-redux';
import store from './redux/store';
const user = memoryService.getUser();
userStatuRecorder.length = 0
if(Object.keys(user).length !== 0) userStatuRecorder[0] = user;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

