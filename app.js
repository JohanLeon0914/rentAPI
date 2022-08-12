const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors())

app.use(express.json())

dotenv.config({path: './env/.env'})

app.use('/', require('./routes/router'))

app.use(cookieParser())

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log('server running on', PORT)
})