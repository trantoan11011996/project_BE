var express = require('express');
const { creatUser, loginUser, updateUser, getAllUser, deleteUser, getUser, getProfileUser } = require('../controller/userController');
const { protect, checkAdmin } = require('../middleware/authMiddleware');
var router = express.Router();




//register user 
router.post('/',creatUser)

//login user 
router.post('/login',loginUser)

//update profile user
router.put('/profile',protect,updateUser)

//get profile user
router.put('/profile',protect,getProfileUser)

// get all (admin)
router.get('/',protect,checkAdmin,getAllUser)

//get user
router.get('/:id',protect,checkAdmin,getUser)


//delete user 
router.delete('/:id',protect,checkAdmin,deleteUser)





module.exports = router;
