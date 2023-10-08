
exports.subscriber = (req,res,next)=>{
    if(req.user?.role !== "Subscriber"){
        return res.status(401).json({success:false,body:{status:'error',info:'Unauthorized request'}})
    }
    next()
}

exports.administrator = (req,res,next)=>{
    if(req.user?.role !== "Administrator"){
        return res.status(401).json({success:false,body:{status:'error',info:'Unauthorized request'}})
    }
    next()
}
