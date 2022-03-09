// var mongoose = require('mongoose');
// var ProductSchema = new mongoose.Schema({
//     productName: String,
//     category: String,
//     price: Number,
//     aboutProduct: String,
//     stock: String,
//     model: String,
//     colour: String,
//     size: Number,
//     dimension: String,
//     discriptionHeading1: String,
//     discriptionAbout1: String,
//     discriptionHeading2: String,
//     discriptionAbout2: String,
//     discriptionHeading3: String,
//     discriptionAbout3: String,
//     weight: String,
//     countryOrgin: String,
//     ideal: String,
//     manufacturer: String,
//     fromManufacturer: String,
//     tag: String,
//     comments: [{
//         userName: String,
//         comment: String
//     }],
//     productA1: String,
//     productA2: String,
//     productA3: String,
//     productA4: String,
//     productA5: String,


// });
// const Product = mongoose.model('Product', ProductSchema);
// module.exports = Product;

var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    productName: String,
    category: String,
    price: Number,
    aboutProduct: String,
    stock: String,
    model: String,
    colour: String,
    size: Number,
    dimension: String,
    discriptionHeading1: String,
    discriptionAbout1: String,
    discriptionHeading2: String,
    discriptionAbout2: String,
    discriptionHeading3: String,
    discriptionAbout3: String,
    weight: String,
    countryOrgin: String,
    ideal: String,
    manufacturer: String,
    fromManufacturer: String,
    tag: String,
    comments: [{
        userName: String,
        comment: String
    }],
    pic: String,
    images:[String]

});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;