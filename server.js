const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const bfhl = require('./routes/bfhl')
const health = require('./routes/health')

app.use(express.json())
app.use('/bfhl', bfhl)
app.use('/health', health)


app.listen(PORT, (req, res)=>{
        console.log(`Server is successfully running on ${PORT} : http://localhost:${PORT}`);
})