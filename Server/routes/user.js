var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://brad:123@ds145790.mlab.com:45790/mytasklist_brad',['user'])

// Get all users
router.get('/user',function(req,res,next){
    db.user.find(function(err,user){
        if(err){
            res.send(err);
        }else{
            res.json(user);
        }
    });
});

module.exports =router;
