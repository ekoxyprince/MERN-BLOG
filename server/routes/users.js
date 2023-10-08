const express = require('express')
const router = express.Router()
const controller = require('../controllers/usercontroller')
const auth = require('../middlewares/auth')
const {subscriber} = require('../middlewares/role')
const {title,content} = require('../middlewares/validation')
const upload = require('../libraries/fileupload')

router
.route('/details')
.get([auth,subscriber],controller.fetchDetails)

router
.route("/post")
.post([auth,subscriber],upload.single('image'),[title,content],controller.createPost)
.patch([auth,subscriber],[title,content],controller.updatePost)
.delete([auth,subscriber],controller.deletePost)

router
.route('/post/:id')
.get([auth,subscriber],controller.findPost)

router
.route('/comment')
.patch([auth,subscriber],controller.commentPost)

router
.route('/like')
.patch([auth,subscriber],controller.likePost)

module.exports = router