const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bfhl = require('./routes/bfhl')
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use('/bfhl', bfhl)


app.listen(PORT, (req, res)=>{
        console.log(`Server is successfully running on ${PORT} : http://localhost:${PORT}`);
})