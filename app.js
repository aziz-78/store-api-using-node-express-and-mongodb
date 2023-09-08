
require("dotenv").config()
const express = require("express")
const app = express()

const notfoundmiddleware = require("./middleware/not-found")
const errorhandlermiddleware = require("./middleware/error-handler")
const connectDB = require("./db/connect")
app.use(express.json())
app.use(notfoundmiddleware)
app.use(errorhandlermiddleware)
const port = process.env.port || 3000
const start = async()=>{
try {
    await connectDB(process.env.db_url);
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    }) 
} catch (error) {
    console.log(error)
}
}
start()

