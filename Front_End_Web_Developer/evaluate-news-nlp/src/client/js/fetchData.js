async function fetchData(data) {
    let res = await fetch('http://localhost:8081/test',{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    return await res.json()
}

export { fetchData }