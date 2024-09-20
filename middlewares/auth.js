const {getUser} = require('../service/auth')
function checkForAuthenticaation(req, res, next) {
    req.user = null
    const tokenCookie = req.cookies?.token
    if(!tokenCookie){
        return next()
    }       
    const token = tokenCookie
    const user = getUser(token)
    req.user = user
    return next()
}
function restrictTo(roles = []) {
    return function(req,res,next){
        if(!req.user) return res.redirect('/login')

        if(!roles.includes(req.user.role)) return res.end('Unauthorized User')

        return next()
    }
}

module.exports = {
    checkForAuthenticaation,
    restrictTo
}