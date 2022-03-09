let Product = require('../model/product')

const set = function (entity, model) {
    if (model.productName) {
        if (model.productName) {
            entity.productName = model.productName
        }

        if (model.category) {
            entity.category = model.category

        }
        if (model.price) {
            entity.price = model.price
        }
        if (model.aboutProduct) {
            entity.aboutProduct = model.aboutProduct
        }
        if (model.stock) {
            entity.stock = model.stock
        }
        if (model.model) {
            entity.model = model.model
        }
        if (model.colour) {
            entity.colour = model.colour
        }
        if (model.size) {
            entity.size = model.size
        }
        if (model.discriptionHeading1) {
            entity.discriptionHeading1 = model.discriptionHeading1
        }
        if (model.discriptionAbout1) {
            entity.discriptionAbout1 = model.discriptionAbout1
        }
        if (model.discriptionHeading2) {
            entity.discriptionHeading2 = model.discriptionHeading2
        }
        if (model.discriptionAbout2) {
            entity.discriptionAbout2 = model.discriptionAbout2
        }
        if (model.discriptionHeading3) {
            entity.discriptionHeading3 = model.discriptionHeading3
        }
        if (model.discriptionAbout3) {
            entity.discriptionAbout3 = model.discriptionAbout3
        }
        if (model.weight) {
            entity.weight = model.weight
        }
        if (model.countryOrgin) {
            entity.countryOrgin = model.countryOrgin
        }
        if (model.ideal) {
            entity.ideal = model.ideal
        }

        if (model.manufacturer) {
            entity.manufacturer = model.manufacturer
        }

        if (model.fromManufacturer) {
            entity.fromManufacturer = model.fromManufacturer
        }

        if (model.tag) {
            entity.tag = model.tag
        }

        if (model.pic) {
            entity.pic = model.pic
        }

        if (model.images  && model.images.length) {
            entity.images = []
            for (const image of model.images) {
                entity.images = entity.images.concat([image])
            } 
               }
        // if (model.productA3) {
        //     entity.productA3 = model.productA3
        // }
        // if (model.productA4) {
        //     entity.productA4 = model.productA4
        // }
        // if (model.productA5) {
        //     entity.productA5 = model.productA5
        // }
    }
}

exports.create = async (model) => {
    let entity = new Product({})
    set(entity, model)
    await entity.save()
    return entity
}

exports.comment = async (id) => {
    try{
        return Product.findById(id) 
    }catch(error){
        console.log(error)
    }
       
}

exports.get = (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return Product.findById(id)
    } else {
        return Product.findOne({
            name: id
        })
    }
}
exports.query = (query) => {
    // return Product.find({query})
    return Product.findOne({ name: query })
}
