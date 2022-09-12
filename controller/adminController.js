const adminModel = require('../model/adminModel')
const asyncHandler = require('express-async-handler')
const generateToken = require('../unitls/generateToken')
const bcrypt = require('bcryptjs')

const creatAdmin = asyncHandler(async(req,res)=>{
    const {body} = req
    const userExist = await adminModel.findOne({email})
    if(userExist){
        res.status(400)
        res.json({
            message : "user have been exist"
        })
    }
    const newUser = await adminModel.create(body)
    if(newUser){
        res.status(200)
        res.json({
            newUser,
            token : generateToken(newUser._id)
        })
    }else{
        res.status(200)
        throw new Error('ivalid register user')
    }
})


module.exports = {
    creatAdmin
}