const authGenerator = (memoryParams,type) => {
    
    if(type === "default"){
        return {headers: {'Authorization': `Bearer ${memoryParams}`}} 
    }else{
        console.log("@upload")

        return {headers: {'Authorization': `Bearer ${memoryParams}`,"Content-Type": "multipart/form-data"}} 
    }



}


export default authGenerator;