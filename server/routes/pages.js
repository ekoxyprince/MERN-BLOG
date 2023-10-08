const express = require('express')
const router = express.Router()
const controller = require('../controllers/pagecontroller')

router
.route('/posts')
.get(controller.getPosts)

router
.route('/post/:postId')
.get(controller.getPost)

module.exports = router
