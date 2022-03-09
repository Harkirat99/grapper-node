const Cart = require('../model/cart');
const cart = require('../model/cart');
const Item = require('../model/cart');
const product = require('../model/product');

exports.cart = async (userId) => {
    // const userId = req.body.userId
    const carts = await Cart.find({userId:userId}).populate({
        path: "items.productId",
        select: " productName productA1 category colour size price total"
    });;
    return carts[0]; 
};    
exports.get = async (id) => {
    const carts = await Cart.findById(id).populate({
        path: "items.productId",
        select: "name imageName category colour size discription price total"
    });;
    return carts;
};

exports.getitem = async (id) => {
    let crt = await cart()
    let itm = await crt.items.findById(id)
    return itm
};

exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}
exports.removeItem = async (itemId) => {
    await Cart.findOne({ items: { $in: [itemId] } }, (err, cartI) => {
        if (err) {
            throw new Error(err)
        }
        if (!cartI) {
            throw new Error('Cart not found')
        }
        let itm = cartI.items
        //   let indxrem = await itm.indexOf(itemId)
        itm.splice(indxrem, 1)
        cartI.items = itm
        cartI.save()
    })
}

// exports.arr = async => {
//     const len = Cart.items.length
//    console.log(len)
// }