
exports.error404 = (req,res,next)=>{
    res.status(404).json({success:false,body:{status:'error',info:'Page not found'}})
}

exports.error500 = (error,req,res,next)=>{
   res.status(500).json({success:false,body:{status:"error",info:'Something went wrong',error:error}})
}