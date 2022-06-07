// 為loading服務的 function
import {load,unload} from "./define.js"
const initPreState = false // 函數default value
export default function exDucer (preState=initPreState,action){
    const { type } = action
    switch(type){
        case load:
            return true
        case unload:
            return false;
        default:
            return initPreState
    }
}