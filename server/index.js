require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router')
const PORT = 3000


app.use(express.urlencoded({extended:true}))
app.use(router)

app.listen(PORT, () => {
    console.log(`listen on port: ${PORT}`)
})

