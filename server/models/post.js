const mongoose = require('mongoose')

const {Schema} = mongoose

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    dateCreated:Date,
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    comments:[{
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        comment:{
            type:String,
            required:true
        },
        dateCommented:Date
    }],
    likes:[
        {
            userId:{
                type:Schema.Types.ObjectId,
                required:true,
                ref:'User'
            }
        }
    ]
})
postSchema.methods.addComment = function(comment){
    let newComments = []
    let oldComments = this.comments
    newComments = [...oldComments,comment]
    this.comments = [...newComments]
    return this.save()
}

postSchema.methods.addLike = function(user){
    let newLikes = []
    let oldLikes = this.likes
    let index = this.likes.findIndex(like=>like.userId.toString() === user.userId)
    console.log(index)
    if(index>-1){
    filteredLikes = this.likes.filter(like=>like.userId.toString() !== user.userId)
    newLikes = [...filteredLikes]
    this.likes = [...newLikes]
    return this.save()
    }else{
    newLikes = [...oldLikes,user]
    this.likes = [...newLikes]
    return this.save()
    }
}

module.exports = mongoose.model('Post',postSchema)