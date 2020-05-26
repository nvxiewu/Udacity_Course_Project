const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const port = 3000
const server = app.listen(port,()=>{console.log(`runing on localhost: ${port}`)})


