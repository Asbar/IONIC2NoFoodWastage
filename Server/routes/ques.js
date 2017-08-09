var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://brad:123@ds145790.mlab.com:45790/mytasklist_brad',['ques'])


// Get questions by specific language
router.get('/ques/:id',function(req,res,next){
    db.ques.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,ques){
        if(err){
            res.send(err);
        }else{
            res.json(ques);
        }
    });
});

// Get all questions
router.get('/ques',function(req,res,next){
    db.ques.find(function(err,ques){
        if(err){
            res.send(err);
        }else{
            res.json(ques);
        }
    });
});

module.exports =router;
