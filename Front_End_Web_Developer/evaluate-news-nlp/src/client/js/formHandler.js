function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let data = Client.checkForName(formText)
    console.log(data)
    if(Object.keys(data).length === 0){
        alert("Must have input value")
        return false
    }
    

    console.log("::: Form Submitted :::")
    Client.fetchData(data)
    .then(function(res) {
        document.getElementById('results').innerHTML = "<p><strong>The article(or sentence) you analyzed:</strong><br>"+res.text+"<br><strong>the description is "+res.subjectivity+",and the tone is "+res.polarity+".</strong></p>"
    }).catch((e)=>{
        console.log(e)
    })
}

export { handleSubmit }
