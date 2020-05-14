function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let data = Client.checkForName(formText)
    console.log(data)
    if(Object.keys(data).length === 0){
        return false
    }
    

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test',{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.text
    }).catch((e)=>{
        console.log(e)
    })
}

export { handleSubmit }
