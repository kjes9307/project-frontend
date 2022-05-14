const axios = require('axios').default;
axios.get('https://secret-wildwood-80895.herokuapp.com/posts/')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

// const apiService = (apiPage,body ={},method="GET") => {
//         let response ;
//         let url = "https://secret-wildwood-80895.herokuapp.com"
//         url = url+apiPage;
//         if(method==="GET"){
//             response=axios.get(url,{params:body});
//         }else if(method==="POST"){
//             response=axios.post(url,body);
//         }else if(method==="DELETE"){
//             response=axios.delete(url,body);
//         }else if(method==='PATCH'){
//             response=axios.patch(url,body);
//         }
//         return response;

// }

// export default apiService;

// https://secret-wildwood-80895.herokuapp.com/posts


// apiService(
//     'posts'
//     ,{}
//     ,"GET"
//     ).then(function (response) {
//         // handle success
//         console.log(response);
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })