const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routers = require('./routers')

app.use(cors)
app.use(express.urlencoded({extended:true}))
app.use(routers)

app.listen(port, () => {
    console.log(`app listen on port ${port}`);
})