const User = require('../models/user')
const Post = require('../models/post')
const {validationResult} = require('express-validator')
const fs = require('fs')
const io = require('../socket')

exports.fetchDetails = (req,res,next)=>{
  const userId = req.user._id
  User.findById(userId)
  .then(user=>{
   if(!user){
    return res.status(400).json({success:false,body:{status:'error',info:"Failed to find user"}})
   }
   res.status(200).json({success:true,body:{status:'success',info:'User fetched successfully', data:user}})
  })
  .catch(error=>{
            const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
  })
}
exports.createPost = (req,res,next)=>{
  const errors = validationResult(req)
  const {title,content} = req.body
  const {destination,filename} = req.file
  const dateCreated = new Date(Date.now())
  const image = (destination+filename).slice(8)
  if(!errors.isEmpty()){
    return res.status(422).json({success:false,body:{status:'error',info:errors.array()}})
  }
  Post.create({
    title:title,
    content:content,
    dateCreated:dateCreated,
    image:image,
    userId:req.user._id
  })
  .then(created=>{
    res.status(200).json({success:true,body:{status:'success',info:'Post Created successfully', data:created}}) 
  })
  .catch(error=>{
            const err = new Error(error)
        err.httpStatusCode = 500
        console.log(err)
        next(err)
  })
}
exports.findPost = (req,res,next)=>{
    const {id} = req.params
    Post.findById(id)
    .then(post=>{
        if(!post){
            return res.status(400).json({success:false,body:{status:'error',info:'No matching post found'}})
        }
        res.status(200).json({success:true,body:{status:'success',info:'Post found',data:post}})
    })
    .catch(error=>{
                const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    })
}
exports.updatePost = (req,res,next)=>{
    const {id,title,content} = req.body
    Post.findById(id)
    .then(post=>{
        if(!post){
            return res.status(400).json({success:false,body:{status:'error',info:'No matching post found'}})
        } 
        post.title = title
        post.content = content
        return post.save()
        .then(saved=>{
            res.status(200).json({success:true,body:{status:'success',info:'Post Updated',data:saved}}) 
        })
    })
    .catch(error=>{
                const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    })
}
exports.deletePost = (req,res,next)=>{
    const {id} = req.body
    Post.findOneAndDelete({_id:id,userId:req.user._id})
    .then(deleted=>{
        if(!deleted){
            return res.status(400).json({success:false,body:{status:'error',info:'No matching post found'}})
        }
       fs.unlinkSync(`./public${deleted.image}`)
       res.status(200).json({success:true,body:{status:'success',info:'Post Deleted',data:deleted}})
    })
    .catch(error=>{
                const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    })
}
exports.commentPost = (req,res,next)=>{
    const {comment,postId} = req.body
    Post.findById(postId)
    .then(post=>{
        if(!post){
            return res.status(400).json({success:false,body:{status:'error',info:'No matching post found'}})
        }
        return post.addComment({userId:(req.user._id).toString(),comment:comment,dateCommented:new Date(Date.now())})
        .then(commented=>{
            io.getIo.emit('comment',commented)
            res.status(200).json({success:true,body:{status:'success',info:'Post Commented on',data:commented}})
        })
        .catch(error=>{
                    const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
        })
    })
}
exports.likePost = (req,res,next)=>{
    const {postId} = req.body
    Post.findById(postId)
    .then(post=>{
        if(!post){
            return res.status(400).json({success:false,body:{status:'error',info:'No matching post found'}})
        }
        return post.addLike({userId:(req.user._id).toString()})
        .then(liked=>{
            io.getIo.emit('like',liked)
            res.status(200).json({success:true,body:{status:'success',info:'Post has been liked',data:liked}})
        })
    })
    .catch(error=>{
                const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    })
}