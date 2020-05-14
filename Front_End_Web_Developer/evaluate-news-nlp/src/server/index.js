var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const aylien = require('aylien_textapi')
dotenv.config()
const textapi = new aylien({
    application_id:process.env.API_ID,
    application_key:process.env.API_KEY
})


const app = express()


app.use(express.static('dist'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/test', function (req, res) {
    let data=req.body
    console.log(req.body)
    textapi.sentiment(data,(error,response)=>{
        if(error === null){
            console.log(response)
            res.send(response)
        }else{
            console.log(error)
        }
    })
    //res.send(mockAPIResponse)
})
