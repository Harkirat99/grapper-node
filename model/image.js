
var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    image: String,
});
const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;