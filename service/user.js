let User = require('../model/user')
let bcrypt = require('bcryptjs')

const set = function (entity, model) {
    if (model.email) {
        entity.email = model.email
    }
    if (model.name) {
        entity.name = model.name
    }
    if (model.password) {
        entity.password = model.password
    }
}

exports.register = async (model) => {
    let count = await User.count({ email: model.email })
    if (count > 0) {
        throw new Error('The email is  already in use')
    }
    model.password = await bcrypt.hash(model.password, 10)
    let entity = new User({})
    await set(entity, model)
    await entity.save()
    return entity
}
exports.get = async (model)=>{
    try{
        let entity = await User.findOne({ email: model.email})
        return entity
    } catch(err){
        console.log(err)
    }
 
}

exports.login = async (model) => {
    let entity = await User.findOne({ email: model.email })
    if (!entity) {
        throw new Error('User not found')
    }
    let res = await compareAsync(model.password, entity.password)
    if (!res) {
        throw new Error('invalid password')
    }
    return entity
}

function compareAsync(simple, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(simple, hash, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}