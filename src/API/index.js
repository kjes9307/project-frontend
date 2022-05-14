import apiService from "./api"
// 取得POST 資料
export const getList= () => apiService('/',{},"GET")