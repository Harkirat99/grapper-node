const cartRepository = require('../repository/cart')
const productRepository = require('../api/product');
const Cart = require('../model/cart')
const mapper = require('../mapper/cart');
const { model } = require('mongoose');
exports.addItemToCart = async (userId, productId, quantity, req, res) => {
  
    try {
        let cart = await cartRepository.cart(userId);
        let productDetails = await productRepository.get(productId);
        if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        
        if (cart) {
            const indexFound = cart.items.findIndex(item => item.productId.id == productId);
            if (indexFound !== -1 && quantity <= 0) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }

            else if (indexFound !== -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            else if (quantity > 0) {
                cart.items.push({
                    userId: userId,
                    productId: productId,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                })
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            data: data
        }
        else {
            const cartData = {
                userId: userId,
                items: [{

                    productId: productId,
                    quantity: quantity,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price
                }],
                subTotal: parseInt(productDetails.price * quantity)
            }
            cart = await cartRepository.addItem(cartData)
            let data = await cart.save();
            res.json(data);
        }
    } catch (err) {
        console.log(err)
    }

}


exports.getCart = async (userId,req, res) => {
    try {
         let cart = await cartRepository.cart(userId)
        if (cart) {
            return cart
        }
    } catch (err) {
        console.log(err)

    }
}

exports.emptyCart = async (req, res) => {
    try {
    //     let cart = await cartRepository.cart();
    //     cart={}
    //     cart.subTotal = 0
    //   await cart.save();
    //     return "deleted sucessfully"
    let cart = await cartRepository.cart();
    console.log('yes')
    let respo = await cart.delete();
    await cart.save();
    if (respo) {
        return 'Deleted Successfully'
    } else {
        return 'Unable to Deleted'
    }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }

}

exports.removeItem = async function (productId,userId) {
    try {
        let cart = await cartRepository.cart(userId);
        let index = await cart.items.findIndex(item => item.productId.id == productId);
        if (index !== -1) {
            cart.items.splice(index, 1);
            if (cart.items.length == 0) {
                cart.subTotal = 0
            } else {
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
        }
        await cart.save();
        return
    }
    catch (error) {
        console.log(error)
    }
}


exports.quantity = async function (productId, quantity,userId) {

    // const quantity = Number.parseInt(req.body.quantity);
    try {
        let cart = await cartRepository.cart(userId);
        const indexFound = cart.items.findIndex(item => item.productId.id == productId);
        let productDetails = await productRepository.get(productId);
        let quan = cart.items[indexFound].quantity;
        if (quan > 1) {
            cart.items[indexFound].quantity = cart.items[indexFound].quantity - quantity;
            cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
            cart.items[indexFound].price = productDetails.price
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        }
        cart.save()
        return
    } catch (error) {
        console.log(error);
    }
}