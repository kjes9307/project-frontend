const apiService = require("./api")
const {requestType} = require("../util/define");
console.log(requestType);
const getPost = data => apiService('/posts', data, reqType.get);

const addPost = data => apiService('/posts', data, reqType.post);

// getPost({key:"3"})
// .then(function (response) {console.log(response.data)})
// .catch(function (error) {console.log(error)})
