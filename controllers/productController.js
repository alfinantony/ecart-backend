// import product collection
const products =require('../models/productSchema')

//Define logic to resolve client request

//get all products
exports.getAllProducts = async (req,res)=>{
    try{
            // get all products from product collection in mongodb
            const allProducts = await products.find()
            // await - it means while doing the api fetching we might face delayed so to handling the delay we use await
            res.status(200).json(allProducts)
        }
    catch(error){
        res.status(401).json(error)
    }
}


//get particular products from an Id
exports.viewProduct = async (req,res)=>{
    //get productId from request
    const id= req.params.id
    //logic
    try{
        //check id is present in mongodb
        const product = await products.findOne({id})
        if(product){
            res.status(200).json(product)
        }
        else{
            res.status(404).json("product Not Found")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}
