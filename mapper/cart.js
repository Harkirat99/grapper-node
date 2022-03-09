const productMapper = require('./product')
const userMapper = require('./user')


exports.toModel = function (entity) {
    let model = {
        id: entity.id,
        userId: userMapper.toModel(entity.userId),
        productId: productMapper.toModel(entity.productId),
        quantity: entity.quantity,
        price: entity.price,
        total: entity.total,
        subtotal: entity.subtotal,

    }

    return model
}

exports.toSearchModel = function (entities) {
    let models = []
    for (const entity of entities) {
        models.push(this.toModel(entity))
    }
    return models
}