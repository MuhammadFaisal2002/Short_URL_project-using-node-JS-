const express = require('express')
const router = express.Router();
const { handleGetShortUrl,handleGetAnalytics} = require('../controllers/url')
router.post('/',handleGetShortUrl)
router.get('/analytics/:shortId',handleGetAnalytics)
module.exports = router