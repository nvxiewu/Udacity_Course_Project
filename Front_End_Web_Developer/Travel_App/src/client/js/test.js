const fetchData = async (url)=>{
    const res = await fetch(url)
    try{
        const data = await res.json()
        console.log(data)
        return data
    }catch(e){
        console.log("error",e)
    }
}
export { fetchData }
