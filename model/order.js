// instamojo model file
var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    purpose: String,
    amount: Number,
    phone: Number,
    buyer_name: String,
    buyer_father_name: String,
    redirect_url: String,
    send_email: Boolean,
    webhook: String,
    send_sms: Boolean,
    email: String,
    allow_repeated_payments: Boolean,
    longUrl: String,
    pincode: Number,
    additional_number: Number,
    street: String,
    landmark: String,
    city: String,
    district: String,
    state: String
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;