const { default: mongoose } = require("mongoose")

const courseScheme ={
    name:{
        type: String,
        require:true,
    },
    shortName:{
        type: String,
        require:true,
    },
    fee:{
type:Number,
    },
    price:{
type:{
    currency:String,
    amount:Number,
}
    }
}

const courseModel = mongoose.model("courses",courseScheme)
module.exports = courseModel;