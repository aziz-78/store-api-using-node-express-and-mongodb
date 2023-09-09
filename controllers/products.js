const Product = require("../models/product")

const getAllProductsStatic = async(req,res) =>{
    const search = "ab"
    const prod = await Product.find({name:{$regex:search,$options:'i'}})
    return res.status(200).json({prod,nbHits:prod.length})
}
const getAllProducts = async(req,res)=>{
    const queryobj = {}
    const {featured,name,company} = req.query
    if(featured){
        queryobj.featured = featured === "true" ? true : false
    }
    if(name){
        queryobj.name = {$regex:name,$options:"i"}
    }
    if(company){
        queryobj.company = company
    }
    const prod = await Product.find(queryobj)
    res.status(200).json({prod})
}

module.exports={
 getAllProducts,
 getAllProductsStatic,
}