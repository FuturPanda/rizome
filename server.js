const express = require('express')
const dotenv = require('dotenv')
const app = express()
const faunadb = require("faunadb")
const client = new faunadb.Client({secret : "fnAE70PCP3AA1tlQ7vHwJyW2qmOsrKfHszLEZ5DT"})
const q = faunadb.query

app.use(express.json())
app.use(express.urlencoded({extended:"false"}))
app.use(express.static("public/"))
app.use('/api/ideas', require('./backend/routes/ideaRoute'))
app.use('/api/users', require('./backend/routes/userRoute'))



app.listen(8080, () => console.log(`Listening on port : ${8080}`))