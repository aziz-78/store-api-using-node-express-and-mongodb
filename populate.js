require('dotenv').config()
const Product = require("./models/product")
const connectDB = require("./db/connect")
const jsonProd = require("./products.json")

const start = async()=>{
    try {
        await connectDB(process.env.db_url)
        await Product.deleteMany()
        await Product.create(jsonProd)
        console.log("connected")
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

start()