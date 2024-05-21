
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
// Routers
const authRouter = require("./routes/authRoutes.js")
const userRouter = require("./routes/userRoutes.js")

app.get("/",(req,res)=>{
    return res.status(200).send({message:"Welcome to Uphaar"})
})

app.use("/auth",authRouter)
app.use("/user",userRouter)

module.exports = app