const mongoose = require('./index')

const userSchema = new mongoose.Schema({
    binName:{
        type:String,
        required:[true,"firstName is required"]
    },
    binLocation:{
        type:String,
        required:[true,"lastName is required"]
    },
    binColor:{
        type:String,
        required:[true,"lastName is required"]
    }
},{versionKey:false,collection:"bins"})

const userModel = mongoose.model('bins',userSchema)

module.exports = userModel;