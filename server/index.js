const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const apiPort = process.env.PORT || 3000
const app = express()

const db = require('./db')
const movieRouter = require('./routes/movie-router')

db.on('error',() => { console.log('Error')})

app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))