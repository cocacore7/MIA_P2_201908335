const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use('/usuario',require('./routes/prueba.route'))
app.use(express.static('./public'))

app.listen(PORT,()=>{
    console.log('Servidor En Puerto',PORT)
})