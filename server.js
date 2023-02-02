const express = require('express')
const dotenv = require('dotenv')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:"false"}))
app.use(express.static("public/"))
app.use('/api/ideas', require('./backend/routes/ideaRoute'))



app.listen(8080, () => console.log(`Listening on port : ${8080}`))