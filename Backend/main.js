const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/prueba',require('./routes/prueba.route'))

app.listen(PORT,()=>{
    console.log('Servidor En Puerto',PORT)
})