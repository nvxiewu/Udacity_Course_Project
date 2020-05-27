tripData = {}
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('dist'))
app.get('/',(req,res)=>{
    res.sendFile('dist/index.html')
})
app.get('/all',(req,res)=>{
    res.send(tripData)
})
app.post('/add',(req,res)=>{
    let data = req.body
    tripData = data
    console.log(tripData)
    res.send(tripData)
})
const port = 3000
const server = app.listen(port,()=>{console.log(`runing on localhost: ${port}`)})


