
// const productMapper = require('./product')
// exports.toModel = function (entity) {
//         let model = {
//             id: entity.id,
//             productName: entity.productName,
//             category:entity.category,
//             price: entity.price,
//             aboutProduct: entity.aboutProduct,
//             stock: entity.stock,
//             model: entity.model,
//             colour: entity.colour,
//             size: entity.size,
//             dimension: entity.dimension,
//             discriptionHeading1: entity.discriptionHeading1,
//             discriptionAbout1: entity.discriptionAbout1,
//             discriptionHeading2: entity.discriptionHeading2,
//             discriptionAbout2: entity.discriptionAbout2,
//             discriptionHeading3: entity.discriptionHeading3,
//             discriptionAbout3: entity.discriptionAbout3,
//             weight: entity.weight,
//             countryOrgin: entity.countryOrgin,
//             ideal: entity.ideal,
//             manufacturer: entity.manufacturer,
//             fromManufacturer: entity.fromManufacturer,
//             productA1: entity.productA1,
//             productA2: entity.productA2,
//             productA3: entity.productA3,
//             productA4: entity.productA4,
//             productA5: entity.productA5,
//             comments:  entity.comments,
//             tag: entity.tag
//         }
     
//         return model
//     }

// exports.toSearchModel = function (entities) {
//     let models = []
//     for (const entity of entities) {
//         models.push(this.toModel(entity))
//     }
//     return models
// }




const productMapper = require('./product')
exports.toModel = function (entity) {
        let model = {
            id: entity.id,
            productName: entity.productName,
            category:entity.category,
            price: entity.price,
            aboutProduct: entity.aboutProduct,
            stock: entity.stock,
            model: entity.model,
            colour: entity.colour,
            size: entity.size,
            dimension: entity.dimension,
            discriptionHeading1: entity.discriptionHeading1,
            discriptionAbout1: entity.discriptionAbout1,
            discriptionHeading2: entity.discriptionHeading2,
            discriptionAbout2: entity.discriptionAbout2,
            discriptionHeading3: entity.discriptionHeading3,
            discriptionAbout3: entity.discriptionAbout3,
            weight: entity.weight,
            countryOrgin: entity.countryOrgin,
            ideal: entity.ideal,
            manufacturer: entity.manufacturer,
            fromManufacturer: entity.fromManufacturer,
            pic: entity.pic,
            images: entity.images,
            tag: entity.tag
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