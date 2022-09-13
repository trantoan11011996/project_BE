const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password :{
        type : String,
        min: 6,
        required : true
    },
    idAdmin :{
        type : Boolean,
        default : true,
    }
},
{collection : "admin"})


adminModel.pre('save', async function(next){
    if(!this.isModified('password')) return next() ///check khi người dùng đổi pass => nếu đổi chạy xuống dưới để hasspass

    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    }catch(e){
        return next(e)
    }
})

const adminModel = mongoose.model('Admin',adminSchema)
module.exports = adminModel