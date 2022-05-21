import { combineReducers } from "redux";
import userStatuRecorder from '../util/memoryParams'
import "./action-type";

const initUser = {
    username: userStatuRecorder[0],
    type: 'normal', // 用法腳色
    errorMsg :''
}

function user(state=initUser,action){
    
    return state;

}


export default combineReducers({user})