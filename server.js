const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const bfhl = require('./routes/bfhl')
const health = require('./routes/health')

app.use(express.json());


// default landing page
app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API is live, go to /health for checking the health, and /bfhl for post requests such as --> fibonacci, prime, hcf, lcm and AI"
    });
});

// routes
app.use('/bfhl', bfhl)
app.use('/health', health)

// starting the server
app.listen(PORT, (req, res)=>{
        console.log(`Server is successfully running on ${PORT} : http://localhost:${PORT}`);
})