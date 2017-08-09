var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:123@ds149511.mlab.com:49511/nofoodwastage',['newsfeed'])

// Get all language details
router.get('/newsfeed',function(req,res,next){
    db.newsfeed.find(function(err,newsfeed){
        if(err){
            res.send(err);
        }else{
            res.json(newsfeed);
        }
    });
});

module.exports = router;


