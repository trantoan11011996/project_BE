const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userModel = require('../model/userModel')

const protect = asyncHandler(async(req,res,next)=>{
        const authorization = req.headers.authorization
        if(authorization && authorization.startsWith('Bearer')){
            try{
                /// ['bearer''token']
                const token = req.headers.authorization.split(' ')[1]
                // => lấy đc token ở vị trí số 1
                const userVerify = jwt.verify(token,'masobimat')
                // kiểm tra token nhập vào bear có hợp lệ với token đc cấp khi register hay k
                const userInfo = await userModel.findById(userVerify.id).select("-password")
                req.userInfo = userInfo
                console.log(req.userInfo)
                next()
            }catch(err){
                res.status(400)
                throw new Error(err)
            }
        }else{
            res.status(400)
            throw new Error('you have to login')
        }
})

const checkAdmin = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.userInfo._id)
    if(user && user.isAdmin == true){
        console.log('admin')
        next()
    }
    else{
        res.status(200)
        throw new Error('you are not admin')
    }
})
module.exports = {
    protect,
    checkAdmin
}