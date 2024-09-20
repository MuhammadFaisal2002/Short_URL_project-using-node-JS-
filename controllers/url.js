const Url = require('../models/url')
const shortid = require('shortid')
async function handleGetShortUrl(req,res){
    
    const body = req.body
    if(!body.url) return res.status(400).json({error : "URL is Required "});
    const shortID = shortid.generate();
if (!shortID) return res.status(500).json({error: "Failed to generate short ID"});
    
    await Url.create({
        
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
        createdBy : req.user._id
    })
    return res.render('home',{id:shortID})
}
async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId
    const result = await Url.findOne({shortId})
    return res.json(
        {
            visitHistory : result.visitHistory.length,
            analytics : result.visitHistory,
        }
    )
}
module.exports = {
    handleGetShortUrl,
    handleGetAnalytics
}