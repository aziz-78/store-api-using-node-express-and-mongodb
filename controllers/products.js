const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ price: { $gt: 30 } })
      .sort('price')
      .select('name price');
  
    res.status(200).json({ products, nbHits: products.length });
  };
const getAllProducts = async(req,res)=>{
    const queryobj = {}
    
    const {featured,name,company,sort,fields,numericFilters} = req.query
    if(featured){
        queryobj.featured = featured === "true" ? true : false
    }
    if(name){
        queryobj.name = {$regex:name,$options:"i"}
    }
    if(company){
        queryobj.company = company
    }
    if(numericFilters){
        const operatorMap = {
            ">" : "$gt",
            "<" : "$lt",
            ">=": "$gte",
            "<=":" $lte ",
            '=' : "$eq"

        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filter = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        const operations = ["price","rating"]
        filter = filter.split(',').forEach((item)=>{
            const [field,operator,value] = item.split("-")
            if(operations.includes(field)){
                queryobj[field]={ [operator]:Number(value) }
            }
        })
        
        
    }
    console.log(queryobj)
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