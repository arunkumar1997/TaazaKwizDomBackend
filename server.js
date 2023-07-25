const express = require("express")
const connectDB = require("./db/db.js")
const cors = require("cors")
const studentRoute = require("./routes/studentRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/abcde", (req, res) => {
    res.json("Hello")
})

app.use('/api/', studentRoute)
app.use('/admin', adminRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)
})
