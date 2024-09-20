const User = require('../models/user')
const { v4: uuidv4 } = require('uuid')
const { setUser } = require('../service/auth')
async function handleUserSignup(req, res) {
    const { name, password, email } = req.body;
    await User.create({
        name, password, email
    })
    return res.render('home')
}
async function handleUserLogin(req, res) {
    const { password, email } = req.body;
    const user = await User.findOne({ email, password })
    if (!user)
        return res.render('login', {
            error: "invalid username or password",
        })  
    const token = setUser(user)
    res.cookie('token', token)
    return res.redirect('/')
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}