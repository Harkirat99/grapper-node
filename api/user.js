let mapper = require('../mapper/user')
let User = require('../model/user')
let service = require('../service/user')

exports.create = async (body) => {
    let entity = await service.register(body)
    return mapper.toModel(entity)
}

exports.login = async (body) => {
    let entity = await service.login(body)
    return mapper.toModel(entity)
}
exports.get =async (body) => {
    let entity = await service.get(body)
    return mapper.toModel(entity)
}
// at Object.exports.cart (c:\\projects\\grapper-node\\repository\\cart.js:8:48)\n    at exports.getCart (c:\\projects\\grapper-node\\api\\cart.js:95:41)\n    at Layer.handle [as handle_request] (c:\\projects\\grapper-node\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (c:\\projects\\grapper-node\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (c:\\projects\\grapper-node\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle…ules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (c:\\projects\\grapper-node\\node_modules\\express\\lib\\router\\index.js:317:13)\n    at c:\\projects\\grapper-node\\node_modules\\express\\lib\\router\\index.js:284:7\n    at Function.process_params (c:\\projects\\grapper-node\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (c:\\projects\\grapper-node\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at jsonParser (c:\\projects\\grapper-node\...
//     __proto__:Error