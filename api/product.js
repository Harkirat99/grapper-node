
let mapper = require('../mapper/product')
let service = require('../service/product')
const Product = require('../model/product')
// const { where } = require('../model/user')

exports.create = async (body) => {
    let entity = await service.create(body)
    return mapper.toModel(entity)
}

exports.comment = async (model,id) => {
    let entity = await service.comment(id)
    if (entity) {
        entity.comments.push({
            userName: model.userName,
            comment: model.comment
        })
    }
    await entity.save()
}

exports.get = async (id) => {
    let entity = await service.get(id)
    return mapper.toModel(entity)
}

// exports.search = async (query) => {
//     let entities = await Product.find(query)
//     return mapper.toSearchModel(entities)
// }

exports.search = async (query) => {
    where = {}

    if (query.productName) {
        where.productName = query.productName
    }
    if (query.category) {
        where.category = query.category
    }
    if (query.colour) {
        where.colour = query.colour
    }
    if (query.size) {
        where.size = query.size
    }
    if (query.price) {
        where.price = query.price
    }
    if (query.manufacturer) {
        where.manufacturer = query.manufacturer
    }

    let entities = await Product.find(where)
    return mapper.toSearchModel(entities)
}

exports.filter = async (mini, maxi) => {
    let products = await Product.find()
    let entity = await products.filter(product => product.price >= mini && product.price <= maxi);
    return mapper.toSearchModel(entity)
    // return entity
}



exports.decreaseSize = async function (id, size) {
    try {
        let product = await Product.findById(id)
        if (product.size <= 5) {
            return
        }
        // if(product.size >= 13){
        //     return
        // }
        if (size) {
            product.size = product.size - size;
            product.save();
        }
    } catch (error) {
        console.log(error)
    }
}

exports.increaseSize = async function (id, size) {
    try {
        let product = await Product.findById(id)
        // if(product.size <=5 ) {
        //     return
        // }
        if (product.size >= 13) {
            return
        }
        if (size) {
            product.size = product.size + size;
            product.save();
        }
    } catch (error) {
        console.log(error)
    }
}



exports.delete = async (id) => {
    let entity = await Product.findByIdAndDelete(id)
    if (entity) {
        return 'Deleted Successfully'
    } else {
        return 'Unable to Deleted'
    }

}

exports.cate = async function (query) {
    where = {}
    if (query.ideal) {
        where.ideal = query.ideal
    }
    let entities = await Product.find(where)
    return mapper.toSearchModel(entities)
}
exports.brand = async function (query) {
    where = {}
    if (query.manufacturer) {
        where.manufacturer = query.manufacturer
    }
    let entities = await Product.find(where)
    return mapper.toSearchModel(entities)
}



exports.prod = async function (query) {
    where = {}

    if (query.name) {
        where.name = query.name
    }
    let entities = await Product.find({ productName: { '$regex': where.name } })
    if (!entities) {
        throw new Error('No product found')
    } else {
        return mapper.toSearchModel(entities)
    }
}
