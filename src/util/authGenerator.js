const authGenerator = (memoryParams) => ( {headers: {'Authorization': `Bearer ${memoryParams}`}} )


export default authGenerator;