function userHandler(req, res, next){
if(!req.headers.username){
    next(401)
}
    next()
}

module.exports = userHandler