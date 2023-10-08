const express = require('express')
const router = express.Router()
const controller = require('../controllers/authcontroller')
const {email,user,password} = require('../middlewares/validation')

router
.route('/signup')
.post([user,password],controller.signup)

router
.route('/signin')
.post([email,password],controller.signin)

module.exports = router