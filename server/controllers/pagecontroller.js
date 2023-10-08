const Post = require('../models/post')

exports.getPosts = (req,res,next)=>{
    Post.find({})
    .populate('userId')
    .populate('comments.userId')
    .populate('likes.userId')
    .then(posts=>{
    res.json({success:true,body:{status:'success',info:'Posts found',data:posts} })
    })
    .catch(error=>{
                const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    })
}

exports.getPost = (req,res,next)=>{
    const {postId} = req.params
    Post.find({_id:postId})
    .populate('userId')
    .populate('comments.userId')
    .populate('likes.userId')
    .then(post=>{
    if(!post){
        return res.status(400).json({success:false,body:{status:'error',info:'No post was found'}})
    }
    res.json({success:true,body:{status:'success',info:'Post found',data:post} })
    })
    .catch(error=>{
                const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    })
}