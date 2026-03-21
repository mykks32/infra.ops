import express from "express"
import cors from "cors"

const app = express()

app.use(cors())

app.get('/api', (req, res) => {
    res.json({
        message: "Hello from backend"
    })
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
    })
