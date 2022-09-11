var express = require('express');
var router = express.Router();




//register user 
router.post('/')

//login user 
router.post('/login')

//get profile user
router.get('/profile')

//update profile user
router.put('/profile')

// get all (admin)
router.get('/')

//delete user 
router.delete('/:id')

//get user by id 
router.get('/:id')

//update user by id
router.put('/:id')

module.exports = router;
