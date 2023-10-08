
module.exports = (controller)=> async(req,res,next)=>{
    try {
        await controller(req,res,next)
    } catch (error) {
        const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    }
}