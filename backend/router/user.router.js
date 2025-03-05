const express = require('express');
const { UserRegister, UserLogin, GetUserDetails } = require('../controller/user.controller');
const auth = require('../utils/auth');
const router = express.Router()

router.post('/register', UserRegister)
router.post('/login', UserLogin)
router.get('/user/:userId', auth, GetUserDetails)

module.exports = router