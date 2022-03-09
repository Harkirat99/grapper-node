let Order = require('../model/order')



exports.get = (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return Order.findById(id)
    } else {
        return Order.findOne({
            name: id
        })
    }
}