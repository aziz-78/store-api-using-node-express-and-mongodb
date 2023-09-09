const Product = require("../models/product")

const getAllProductsStatic = async(req,res) =>{
    const search = "ab"
    const prod = await Product.find({name:{$regex:search,$options:'i'}}).limit(5).skip(1)
    return res.status(200).json({prod,nbHits:prod.length})
}
const getAllProducts = async(req,res)=>{
    const queryobj = {}
    
    const {featured,name,company,sort,fields} = req.query
    if(featured){
        queryobj.featured = featured === "true" ? true : false
    }
    if(name){
        queryobj.name = {$regex:name,$options:"i"}
    }
    if(company){
        queryobj.company = company
    }
    const result = Product.find(queryobj)
    if(sort){
       const sortedlist = sort.split(",").join(" ")
       result.sort(sortedlist)
    }
    else{
        result.sort("createdAt")
    }
    if(fields){
        const fieldlist = fields.split(",").join(" ")
       result.select(fieldlist)
    }
    const page =Number(req.query.page) || 1
    const limit =Number(req.query.limit) || 10
    const skip = (page -1) * limit
    const prod = await result.limit(limit).skip(skip)
    res.status(200).json({prod})
}

module.exports={
 getAllProducts,
 getAllProductsStatic,
}