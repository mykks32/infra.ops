import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())

app.get('/api', (req, res) => {
    res.json({
        message: "Hello from backend"
    })
})

app.get('/api/health', (req, res) => {
    res.json({
        message: "All good"
    })
})

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
    console.log(`${process.env.MESSAGE} ${process.env.PORT}`)
})