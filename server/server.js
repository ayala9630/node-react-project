require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB=require("./config/DBconn")
const corsOptions=require("./config/corsOptions")
const mongoose= require("mongoose")

const app = express()
const PORT = process.env.PORT || 5002

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

connectDB()

app.use("/api/users",require("./routes/userRoute"))
app.use("/api/products",require("./routes/productRoute"))
app.use("/api/basket",require("./routes/basketRoute"))

mongoose.connection.once("open",()=>{
    console.log("Connected to mongoDB")
    app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})
})

mongoose.connection.on("error",err=>{
    console.log(`error: ${err}`)
})