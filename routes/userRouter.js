var express = require('express');
const { creatUser, loginUser, updateUser, getAllUser, deleteUser, getUser, getProfileUser } = require('../controller/userController');
const { protect, checkAdmin } = require('../middleware/authMiddleware');
var router = express.Router();













// 1. 
// desc : register new user
// route : POST /api/users/register
// access : public 
router.post('/',creatUser)

// 2.
// desc : user login to system
// route : POST /api/users/login
// access : public - return token 
router.post('/login',loginUser)

// 3.
// desc : get profile user
// route : GET /api/users/profile
// access : private - use token - return order
router.get('/profile',protect,getProfileUser)

// 4.
// desc : update user 
// route : PUT /api/users/profile
// access : user
router.put('/profile',protect,updateUser)

// 5.
// desc : get all user
// route : GET /api/users/
// access : private - admin
router.get('/',protect,checkAdmin,getAllUser)

// 6.
// desc : get user by id
// route : GET /api/users/:id/
// access : private - admin
router.get('/:id',protect,checkAdmin,getUser)


// 7.
// desc : delete user
// route : DEL /api/users/:id
// access : private - admin
router.delete('/:id',protect,checkAdmin,deleteUser)





module.exports = router;
