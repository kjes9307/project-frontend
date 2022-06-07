// 中央管控
import {createStore} from 'redux'
// 處理事件的廚房
import loadingDucer from './loadingDucer.js'


export default createStore(loadingDucer) ;
