const fetchData = async (url)=>{
    const res = await fetch(url)
    try{
        const data = await res.json()
        //console.log(data)
        return data
    }catch(e){
        console.log("error",e)
    }
}
const postData = async (url = '',data = {})=>{
    const res = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    })
    try{
        const newData = await res.json()
        return newData
    }catch(e){
        console.log("error",e)
    }
}
export { fetchData,postData }
