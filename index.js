const express = require('express')
const PORT = 8001
const path = require('path')
const cookieParser = require('cookie-parser')
const { restrictTo,checkForAuthenticaation } = require('./middlewares/auth')

const Url = require('./models/url')

const urlRoute = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const { connectToMongoDB } = require('./connection')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticaation)

app.use('/url', restrictTo(['NORMAL','ADMIN']),urlRoute)
app.use('/user',userRoute)
app.use('/', staticRouter)


app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now(), },
        },
    })
    res.redirect(entry.redirectURL)
})
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => {
    console.log("mongo Db Connected");
})

app.listen(PORT, () => {
    console.log(`Server Started at PORT : ${PORT}`);
})