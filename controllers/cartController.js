//import cart collection
const carts = require('../models/cartSchema')

//add to cart
exports.addToCart = async (req, res) => {
    //get product details form the request

    //destructure
    const { id, title, price, image, quantity } = req.body

    //logic
    try {
        //check the product is already in cart collection
        const product = await carts.findOne({ id })
        if (product) {
            //product is in the cart collection, so increment product quantity
            product.quantity += 1
            // update the product grand total
            product.grandTotal = product.price * product.quantity
            //to update product grand total in mongodb collection
            product.save()
            //to send response back to client
            res.status(200).json("Product Added To Your Cart")
        }
        else {
            //product is not in the cart collection
            //add product to cart
            const newProduct = new carts({ id, title, price, image, quantity, grandTotal: price })
            //save new product in cart
            await newProduct.save()
            //to send response back to client 
            res.status(200).json("Product Added Successfully")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//get cart
exports.getCart = async (req, res) => {
    //get  all product from the cart
    try {
        //logic
        const allcarts = await carts.find()
        res.status(200).json(allcarts)
    }
    catch (error) {
        res.status(404).json(error)
    }
}

//cart deletion
exports.removeCartItem = async (req, res) => {
    //get id from the request
    const { id } = req.params
    //product remove from the cart collection
    try {
        //logic
        const removeCart = await carts.deleteOne({ id })
        if (removeCart.deletedCount != 0) {
            //to get the remaining products fromm the cart displayed to frontend
            const allcarts = await carts.find()
            res.status(200).json(allcarts)
        }
        else {
            res.status(404).json("Item Not Found")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }


}

//cart increment

exports.incrementCart = async (req, res) => {
    //get product id from the request
    const { id } = req.params
    try {
        //logic
        //check the product in the cart collection if it exists the increment the quantity
        const product = await carts.findOne({ id })
        //if it exists then increment the quantity
        if (product) {
            //update the quantity and grand total price
            product.quantity += 1
            product.grandTotal = product.price * product.quantity
            //save changes in mongodb
            await product.save()
            //increment the quantity, get all cart collection item and updating in particular item count
            //item count
            const allcarts = await carts.find()
            res.status(200).json(allcarts)
        }
        else {
            res.status(404).json("Item Not Found")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}

//cart decrement

exports.decrementCart = async (req, res) => {
    //get product id from the request
    const { id } = req.params
    try {
        //logic
        //check the product in the cart collection if it exists the decrement the quantity
        const product = await carts.findOne({ id })

        if (product.quantity == 0) {
            const removeCart = await carts.deleteOne({ id })
            //to get the remaining products fromm the cart displayed to frontend
            const allcarts = await carts.find()
            res.status(200).json(allcarts)
        }
        else {
            //if it exists then decrement the quantity
            if (product) {
                //update the quantity and grand total price
                product.quantity -= 1
                product.grandTotal = product.price * product.quantity
                //save changes in mongodb
                await product.save()
                //increment the quantity, get all cart collection item and updating in particular item count
                //item count
                const allcarts = await carts.find()
                res.status(200).json(allcarts)
            }
            else {
                res.status(404).json("Item Not Found")
            }

        }

    }

    catch (error) {
        res.status(404).json(error)
    }
} 

